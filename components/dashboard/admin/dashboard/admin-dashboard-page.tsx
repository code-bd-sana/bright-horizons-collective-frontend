import { DashboardMetricCards } from './dashboard-metric-cards';
import { DashboardQuickActions } from './dashboard-quick-actions';
import { MembershipDistribution } from './membership-distribution';
import { ParentMessages } from './parent-messages';
import { RecentActivity } from './recent-activity';
import { WeeklyPlanStatus } from './weekly-plan-status';

export function AdminDashboardPage() {
  return (
    <section className="mx-auto w-full max-w-382 pb-10 text-[#263238]">
      <header>
        <h1 className="font-nunito text-2xl font-semibold leading-8 text-[#171717]">Dashboard</h1>
        <p className="mt-0.5 font-manrope text-sm leading-5.5 text-[#5f6670]">
          Welcome back. Here’s what’s happening across the platform today.
        </p>
      </header>
      <section className="mt-6" aria-labelledby="platform-overview-heading">
        <h2
          id="platform-overview-heading"
          className="font-nunito text-xl font-semibold leading-7.5 text-[#263238]"
        >
          Platform Overview
        </h2>
        <div className="mt-5">
          <DashboardMetricCards />
        </div>
      </section>
      <div className="mt-8">
        <DashboardQuickActions />
      </div>
      <div className="mt-8 grid gap-6 2xl:grid-cols-2">
        <WeeklyPlanStatus />
        <RecentActivity />
      </div>
      <div className="mt-8 grid gap-6 2xl:grid-cols-2">
        <MembershipDistribution />
        <ParentMessages />
      </div>
    </section>
  );
}
