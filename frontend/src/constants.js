import { Code2, FolderKanban, MessageSquareText, ShieldCheck } from 'lucide-react'

export const samplePrompts = [
  { label: 'Operations', title: 'Inventory & order operations', prompt: 'Build an inventory and order management platform for a growing retail business. Include SKU tracking, low-stock alerts, purchase orders, order fulfilment, supplier records and an operations dashboard.' },
  { label: 'Customer experience', title: 'Customer support portal', prompt: 'Build a customer support portal for a SaaS company. Include customer accounts, ticket intake, priority and status workflows, agent assignment, knowledge base and service performance reporting.' },
  { label: 'Finance', title: 'Expense approval workflow', prompt: 'Build an expense management and approval system for a 100-person company. Include employee submissions, receipt records, manager approvals, budget categories, audit history and finance reporting.' },
]

export const stages = [
  { id: 'requirements', label: 'Discover', detail: 'Translate the business brief', icon: MessageSquareText },
  { id: 'plan', label: 'Design', detail: 'Map scope and delivery plan', icon: FolderKanban },
  { id: 'build', label: 'Build', detail: 'Assemble project artifacts', icon: Code2 },
  { id: 'test', label: 'Validate', detail: 'Run structural quality checks', icon: ShieldCheck },
]

export const team = [
  { n: '01', name: 'Discovery agent', role: 'Business requirements' },
  { n: '02', name: 'Solution architect', role: 'Scope & work plan' },
  { n: '03', name: 'Build engineer', role: 'Project scaffolding' },
  { n: '04', name: 'Quality analyst', role: 'Output validation' },
]

export const MAX_BRIEF = 4000
