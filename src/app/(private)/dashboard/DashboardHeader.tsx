import { PageHeader } from "@/components/PageHeader";

const DashboardHeader = () => {
  return (
    <PageHeader
      eyebrow="Workspace"
      title="Manage your links"
      description="Create polished short links, monitor engagement, and keep everything organized from one calm dashboard."
      badge="Active workspace"
      crumbs={[{ label: "Dashboard" }]}
    />
  );
};

export default DashboardHeader;
