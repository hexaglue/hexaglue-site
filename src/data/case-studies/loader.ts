/**
 * Loader for case study audit data.
 * Maps audit-report.json files to Astro component props.
 *
 * JSON files are collected by `hexaglue/scripts/update-case-studies.js`
 * from the case study builds into this directory.
 */

import type { KpiRow } from '../../pages/case-studies/_components/KpiTable.astro';
import type { ViolationRow } from '../../pages/case-studies/_components/ViolationsTable.astro';
import type { InventoryRow } from '../../pages/case-studies/_components/InventoryTable.astro';
import type { MetricRow } from '../../pages/case-studies/_components/MetricsTable.astro';
import type { PackageStabilityRow } from '../../pages/case-studies/_components/PackageStabilityTable.astro';
import type { RemediationRow } from '../../pages/case-studies/_components/RemediationTable.astro';

// ---------------------------------------------------------------------------
// JSON type definitions (mirrors audit-report.json structure)
// ---------------------------------------------------------------------------

interface AuditReport {
  verdict: {
    score: number;
    grade: string;
    status: 'FAILED' | 'PASSED_WITH_WARNINGS' | 'PASSED';
    kpis: Array<{
      id: string;
      name: string;
      value: number;
      unit: string;
      threshold: number;
      status: 'OK' | 'WARNING' | 'CRITICAL';
    }>;
  };
  architecture: {
    inventory: {
      totals: {
        aggregates: number;
        entities: number;
        valueObjects: number;
        identifiers: number;
        domainEvents: number;
        domainServices: number;
        applicationServices: number;
        commandHandlers: number;
        queryHandlers: number;
        drivingPorts: number;
        drivenPorts: number;
      };
    };
    components: {
      aggregates: Array<{ name: string }>;
      valueObjects: Array<{ name: string }>;
      identifiers: Array<{ name: string }>;
      drivingPorts: Array<{ name: string }>;
      drivenPorts: Array<{ name: string }>;
    };
  };
  issues: {
    summary: {
      total: number;
      blockers: number;
      criticals: number;
      majors: number;
      minors: number;
      infos: number;
    };
    groups: Array<{
      violations: Array<{
        constraintId: string;
        severity: 'BLOCKER' | 'CRITICAL' | 'MAJOR' | 'MINOR' | 'INFO';
        message: string;
      }>;
    }>;
  };
  remediation: {
    actions: Array<{
      priority: number;
      severity: 'BLOCKER' | 'CRITICAL' | 'MAJOR' | 'MINOR' | 'INFO';
      title: string;
      description: string;
      effort: { days: number };
      affectedTypes: string[];
      relatedIssues: string[];
      hexagluePlugin: string | null;
    }>;
  };
  appendix: {
    scoreBreakdown: {
      dddCompliance: { weight: number; score: number };
      hexagonalCompliance: { weight: number; score: number };
      dependencyQuality: { weight: number; score: number };
      couplingMetrics: { weight: number; score: number };
      cohesionQuality: { weight: number; score: number };
    };
    metrics: Array<{
      id: string;
      name: string;
      value: number;
      unit: string;
      threshold: { min?: number; max?: number } | null;
      status: 'OK' | 'WARNING' | 'CRITICAL';
    }>;
    packageMetrics: Array<{
      package: string;
      ca: number;
      ce: number;
      instability: number;
      abstractness: number;
      distance: number;
      zone: string;
    }>;
  };
}

// ---------------------------------------------------------------------------
// Props types
// ---------------------------------------------------------------------------

export interface AuditVerdictProps {
  score: number;
  grade: string;
  status: 'FAILED' | 'PASSED_WITH_WARNINGS' | 'PASSED';
  violations: { critical: number; major: number };
  delta?: { score: number; violations: number };
}

// ---------------------------------------------------------------------------
// Loading
// ---------------------------------------------------------------------------

import bankingLegacyJson from './banking-legacy.json';
import bankingHexagonalJson from './banking-hexagonal.json';
import ecommerceLegacyJson from './ecommerce-legacy.json';
import ecommerceHexagonalJson from './ecommerce-hexagonal.json';

export function loadBankingAudit() {
  return {
    legacy: bankingLegacyJson as AuditReport,
    hexagonal: bankingHexagonalJson as AuditReport,
  };
}

export function loadEcommerceAudit() {
  return {
    legacy: ecommerceLegacyJson as AuditReport,
    hexagonal: ecommerceHexagonalJson as AuditReport,
  };
}

// ---------------------------------------------------------------------------
// Mapping: Verdict
// ---------------------------------------------------------------------------

export function toAuditVerdict(
  data: AuditReport,
  delta?: { score: number; violations: number },
): AuditVerdictProps {
  return {
    score: data.verdict.score,
    grade: data.verdict.grade,
    status: data.verdict.status,
    violations: {
      critical: data.issues.summary.criticals,
      major: data.issues.summary.majors,
    },
    ...(delta ? { delta } : {}),
  };
}

// ---------------------------------------------------------------------------
// Mapping: KPI rows
// ---------------------------------------------------------------------------

export function toKpiRows(data: AuditReport): { rows: KpiRow[]; total: string } {
  const breakdown = data.appendix.scoreBreakdown;
  const kpis = data.verdict.kpis;

  const rows: KpiRow[] = kpis.map((kpi) => {
    const dim = dimensionForKpi(kpi.id, breakdown);
    const contribution = (dim.weight * kpi.value) / 100;
    return {
      dimension: kpi.name,
      value: `${Math.round(kpi.value)}%`,
      weight: `${dim.weight}%`,
      contribution: contribution.toFixed(contribution % 1 === 0 ? 1 : 2),
      threshold: `\u2265 ${Math.round(kpi.threshold)}%`,
      status: kpi.status,
    };
  });

  const total = rows.reduce((sum, r) => sum + parseFloat(r.contribution), 0);
  return { rows, total: total.toFixed(2) };
}

function dimensionForKpi(
  kpiId: string,
  breakdown: AuditReport['appendix']['scoreBreakdown'],
) {
  switch (kpiId) {
    case 'ddd-compliance': return breakdown.dddCompliance;
    case 'hexagonal-compliance': return breakdown.hexagonalCompliance;
    case 'dependency-quality': return breakdown.dependencyQuality;
    case 'coupling-metrics': return breakdown.couplingMetrics;
    case 'cohesion-quality': return breakdown.cohesionQuality;
    default: return { weight: 0, score: 0 };
  }
}

// ---------------------------------------------------------------------------
// Mapping: KPI rows with delta
// ---------------------------------------------------------------------------

export function toKpiRowsWithDelta(
  current: AuditReport,
  previous: AuditReport,
): { rows: KpiRow[]; total: string } {
  const result = toKpiRows(current);
  const prevKpis = previous.verdict.kpis;

  result.rows = result.rows.map((row, i) => {
    const prevKpi = prevKpis[i];
    if (!prevKpi) return row;
    const diff = Math.round(current.verdict.kpis[i].value) - Math.round(prevKpi.value);
    return {
      ...row,
      delta: diff === 0 ? '=' : diff > 0 ? `+${diff}` : `${diff}`,
    };
  });

  return result;
}

// ---------------------------------------------------------------------------
// Mapping: Violations
// ---------------------------------------------------------------------------

export function toViolationRows(data: AuditReport): ViolationRow[] {
  const byConstraint = new Map<string, { count: number; severity: string; observation?: string }>();

  for (const group of data.issues.groups) {
    for (const v of group.violations) {
      const key = v.constraintId;
      const existing = byConstraint.get(key);
      if (existing) {
        existing.count++;
      } else {
        byConstraint.set(key, {
          count: 1,
          severity: v.severity,
          observation: v.message,
        });
      }
    }
  }

  return Array.from(byConstraint.entries()).map(([constraint, info]) => ({
    constraint,
    count: info.count,
    severity: info.severity as 'CRITICAL' | 'MAJOR',
    ...(info.count === 1 ? { observation: info.observation } : {}),
  }));
}

// ---------------------------------------------------------------------------
// Mapping: Inventory
// ---------------------------------------------------------------------------

export function toInventoryRows(data: AuditReport): InventoryRow[] {
  const t = data.architecture.inventory.totals;
  const c = data.architecture.components;

  const rows: InventoryRow[] = [];

  rows.push({
    component: 'Aggregate Roots',
    count: t.aggregates,
    ...(t.aggregates > 0 ? { observation: c.aggregates.map((a) => a.name).join(', ') } : {}),
  });
  rows.push({
    component: 'Entities',
    count: t.entities,
  });
  rows.push({
    component: 'Value Objects',
    count: t.valueObjects,
    ...(t.valueObjects > 0 ? { observation: c.valueObjects.map((v) => v.name).join(', ') } : {}),
  });
  rows.push({
    component: 'Identifiers',
    count: t.identifiers,
    ...(t.identifiers > 0 ? { observation: c.identifiers.map((i) => i.name).join(', ') } : {}),
  });
  rows.push({
    component: 'Domain Events',
    count: t.domainEvents,
  });
  rows.push({
    component: 'Application Services',
    count: t.applicationServices,
    ...(t.applicationServices > 0 ? { observation: `${t.applicationServices} use case implementations` } : {}),
  });
  rows.push({
    component: 'Driving Ports',
    count: t.drivingPorts,
    ...(t.drivingPorts > 0 ? { observation: c.drivingPorts.map((p) => p.name).join(', ') } : {}),
  });
  rows.push({
    component: 'Driven Ports',
    count: t.drivenPorts,
    ...(t.drivenPorts > 0 ? { observation: c.drivenPorts.map((p) => p.name).join(', ') } : {}),
  });

  return rows;
}

// ---------------------------------------------------------------------------
// Mapping: Metrics (selected 6)
// ---------------------------------------------------------------------------

const SELECTED_METRICS = [
  'domain.purity',
  'domain.coverage',
  'aggregate.boundary',
  'code.boilerplate.ratio',
  'code.complexity.average',
  'hexagonal.adapter.independence',
];

const METRIC_DISPLAY_NAMES: Record<string, string> = {
  'domain.purity': 'Domain purity',
  'domain.coverage': 'Domain coverage',
  'aggregate.boundary': 'Aggregate boundary',
  'code.boilerplate.ratio': 'Code boilerplate',
  'code.complexity.average': 'Code complexity',
  'hexagonal.adapter.independence': 'Adapter independence',
};

export function toMetricRows(data: AuditReport): MetricRow[] {
  return SELECTED_METRICS
    .map((id) => data.appendix.metrics.find((m) => m.id === id))
    .filter((m): m is NonNullable<typeof m> => m != null)
    .map((m) => ({
      metric: METRIC_DISPLAY_NAMES[m.id] ?? m.name,
      value: formatMetricValue(m.value, m.unit),
      threshold: formatThreshold(m.threshold, m.unit),
      status: m.status,
    }));
}

function formatMetricValue(value: number, unit: string): string {
  if (unit === '%') return `${value.toFixed(2)}%`;
  if (unit === 'ratio') return value.toFixed(2);
  return value.toFixed(2);
}

function formatThreshold(threshold: { min?: number; max?: number } | null, unit: string): string {
  if (!threshold) return '';
  if (threshold.min != null && threshold.max != null) {
    return `${threshold.min}–${threshold.max}`;
  }
  if (threshold.min != null) {
    return unit === '%' ? `min ${threshold.min}%` : `min ${threshold.min}`;
  }
  if (threshold.max != null) {
    return unit === '%' ? `max ${threshold.max}%` : `max ${threshold.max}`;
  }
  return '';
}

// ---------------------------------------------------------------------------
// Mapping: Package stability
// ---------------------------------------------------------------------------

const ZONE_LABELS: Record<string, PackageStabilityRow['zone']> = {
  'ZONE_OF_PAIN': 'Zone of Pain',
  'MAIN_SEQUENCE': 'Main Sequence',
  'ZONE_OF_USELESSNESS': 'Zone of Uselessness',
  'STABLE_CORE': 'Stable Core',
};

export function toPackageStabilityRows(data: AuditReport): PackageStabilityRow[] {
  return data.appendix.packageMetrics.map((pm) => ({
    package: pm.package,
    ca: pm.ca,
    ce: pm.ce,
    instability: pm.instability,
    abstractness: pm.abstractness,
    distance: pm.distance,
    zone: ZONE_LABELS[pm.zone] ?? 'Main Sequence',
  }));
}

export function filterPackages(
  rows: PackageStabilityRow[],
  includes: string[],
): PackageStabilityRow[] {
  return rows.filter((r) => includes.some((inc) => r.package.includes(inc)));
}

// ---------------------------------------------------------------------------
// Mapping: Remediation
// ---------------------------------------------------------------------------

export function toRemediationRows(data: AuditReport): RemediationRow[] {
  return data.remediation.actions.map((action) => ({
    constraint: action.relatedIssues[0]?.replace(/-\d+$/, '').replace(/-/g, ':') ?? action.title,
    violations: action.relatedIssues.length || 1,
    severity: action.severity as RemediationRow['severity'],
    manualEffort: action.effort.days,
    hexaglueEffort: action.hexagluePlugin ? 0 : action.effort.days,
    description: action.title,
    affectedTypes: action.affectedTypes,
  }));
}

// ---------------------------------------------------------------------------
// Delta computation
// ---------------------------------------------------------------------------

export function computeScoreDelta(
  legacy: AuditReport,
  hexagonal: AuditReport,
): { score: number; violations: number } {
  const legacyViolations = legacy.issues.summary.criticals + legacy.issues.summary.majors;
  const hexagonalViolations = hexagonal.issues.summary.criticals + hexagonal.issues.summary.majors;
  return {
    score: hexagonal.verdict.score - legacy.verdict.score,
    violations: hexagonalViolations - legacyViolations,
  };
}
