import React, { useState, useEffect, useRef } from 'react';
import { Header } from './components/Header';
import { Sidebar, ActiveTab } from './components/Sidebar';
import { OverviewDashboard } from './components/OverviewDashboard';
import { CompaniesView } from './components/CompaniesView';
import { KPIsView } from './components/KPIsView';
import { PlaysView } from './components/PlaysView';
import { JobsView } from './components/JobsView';
import { EvidenceView } from './components/EvidenceView';
import { LazyLarryAssistant } from './components/LazyLarryAssistant';
import { OpportunityHunterView } from './components/OpportunityHunterView';
import { SocialAutomationView } from './components/SocialAutomationView';
import { IntelligenceView } from './components/IntelligenceView';
import { ContentStudioView } from './components/ContentStudioView';
import { AutomationWorkflowsView } from './components/AutomationWorkflowsView';
import { ValueCycleView } from './components/ValueCycleView';
import { OperatingManualView } from './components/OperatingManualView';
import { CommercialLaunchView } from './components/CommercialLaunchView';
import { DropLandingView } from './components/DropLandingView';
import { UserDashboardView } from './components/UserDashboardView';
import { CustomerFacingStorefront } from './components/CustomerFacingStorefront';
import { GrowthRoadmapView } from './components/GrowthRoadmapView';
import { LaunchProductionPortal } from './components/LaunchProductionPortal';
import { RegisterModal } from './components/RegisterModal';
import { RunCycleModal } from './components/RunCycleModal';
import { Company, KPIRecord, Job, EvidenceRecord, UserProfile } from './types';

export function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('drop_page');
  const [companies, setCompanies] = useState<Company[]>([]);
  const [currentCompanyId, setCurrentCompanyId] = useState<string>(() => {
    return localStorage.getItem('profit_os_current_company_id') || 'autonoma-x';
  });
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [kpis, setKpis] = useState<KPIRecord[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [evidence, setEvidence] = useState<EvidenceRecord[]>([]);
  const [apiStatus, setApiStatus] = useState<string>('Connected');
  const [isRunCycleOpen, setIsRunCycleOpen] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch('/api/v1/auth/me')
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setCurrentUser(data);
        }
      })
      .catch((err) => console.warn('Auth fetch error:', err));
  }, []);

  // Persist currentCompanyId in localStorage
  useEffect(() => {
    if (currentCompanyId) {
      localStorage.setItem('profit_os_current_company_id', currentCompanyId);
    }
  }, [currentCompanyId]);

  // Scroll main view to top on activeTab change
  useEffect(() => {
    if (mainRef.current) {
      mainRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [activeTab]);

  // Load Companies
  const fetchCompanies = async () => {
    try {
      const res = await fetch('/api/v1/companies');
      if (res.ok) {
        const data = await res.json();
        setCompanies(data);
        const savedCompanyId = localStorage.getItem('profit_os_current_company_id');
        if (savedCompanyId && data.find((c: Company) => c.id === savedCompanyId)) {
          setCurrentCompanyId(savedCompanyId);
        } else if (data.length > 0 && !data.find((c: Company) => c.id === currentCompanyId)) {
          setCurrentCompanyId(data[0].id);
        }
      }
    } catch (err) {
      console.error(err);
      setApiStatus('Offline');
    }
  };

  // Load Company Data
  const fetchCompanyData = async (companyId: string) => {
    try {
      // KPIs
      const kRes = await fetch(`/api/v1/kpis/company/${companyId}/latest`);
      if (kRes.ok) {
        const kData = await kRes.json();
        setKpis(kData);
      }

      // Jobs
      const jRes = await fetch(`/api/v1/jobs/company/${companyId}`);
      if (jRes.ok) {
        const jData = await jRes.json();
        setJobs(jData);
      }

      // Evidence
      const eRes = await fetch(`/api/v1/evidence/company/${companyId}`);
      if (eRes.ok) {
        const eData = await eRes.json();
        setEvidence(eData);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  useEffect(() => {
    if (currentCompanyId) {
      fetchCompanyData(currentCompanyId);
    }
  }, [currentCompanyId]);

  const handleCreateCompany = async (newComp: { name: string; industry: string; size: any }) => {
    try {
      const res = await fetch('/api/v1/companies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newComp)
      });
      if (res.ok) {
        const created = await res.json();
        setCompanies((prev) => [...prev, created]);
        setCurrentCompanyId(created.id);
        setNotification(`Company '${created.name}' registered successfully!`);
        setTimeout(() => setNotification(null), 4000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleRunCycleComplete = (result: any) => {
    setNotification(
      `Growth Cycle Completed! ${result.jobs_created} jobs created and ${result.plays_triggered?.length || 0} plays triggered.`
    );
    setTimeout(() => setNotification(null), 5000);
    fetchCompanyData(currentCompanyId);
  };

  const handleRegisterSuccess = (newUser: UserProfile, newWorkspaceId: string) => {
    setCurrentUser(newUser);
    setCurrentCompanyId(newWorkspaceId);
    fetchCompanies();
    setNotification(`Welcome, ${newUser.name}! Individual operator workspace created.`);
    setTimeout(() => setNotification(null), 5000);
    setActiveTab('user_dashboard');
  };

  const currentCompany =
    companies.find((c) => c.id === currentCompanyId) || {
      id: currentCompanyId,
      name: 'AutonomaX Growth Corp',
      industry: 'AI Automation',
      size: 'smb' as const
    };

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col font-sans">
      <Header
        currentCompanyId={currentCompanyId}
        companies={companies}
        onCompanyChange={setCurrentCompanyId}
        onOpenRunCycle={() => setIsRunCycleOpen(true)}
        apiStatus={apiStatus}
      />

      {notification && (
        <div className="bg-indigo-600 text-white px-6 py-2.5 text-xs font-medium text-center shadow-md animate-fade-in flex items-center justify-center space-x-2">
          <span>✨</span>
          <span>{notification}</span>
        </div>
      )}

      <div className="flex flex-1 overflow-hidden">
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

        <main ref={mainRef} className="flex-1 p-6 md:p-8 overflow-y-auto max-w-7xl mx-auto w-full">
          {activeTab === 'launch_portal' && (
            <LaunchProductionPortal />
          )}

          {activeTab === 'customer_portal' && (
            <CustomerFacingStorefront onEnterDashboard={() => setActiveTab('overview')} />
          )}

          {activeTab === 'growth_roadmap' && (
            <GrowthRoadmapView
              company={currentCompany}
              kpis={kpis}
              onNavigate={(tab) => setActiveTab(tab)}
              onRunCycle={() => setIsRunCycleOpen(true)}
            />
          )}

          {activeTab === 'drop_page' && (
            <DropLandingView
              onEnterApp={() => setActiveTab('overview')}
              onOpenRegister={() => setIsRegisterOpen(true)}
            />
          )}

          {activeTab === 'user_dashboard' && (
            <UserDashboardView
              user={currentUser}
              company={currentCompany}
              kpis={kpis}
              jobs={jobs}
              onOpenRegister={() => setIsRegisterOpen(true)}
              onRunCycle={() => setIsRunCycleOpen(true)}
            />
          )}

          {activeTab === 'overview' && (
            <OverviewDashboard
              company={currentCompany}
              kpis={kpis}
              jobs={jobs}
              evidence={evidence}
              onOpenRunCycle={() => setIsRunCycleOpen(true)}
              onNavigate={setActiveTab}
            />
          )}

          {activeTab === 'value_cycle' && <ValueCycleView />}

          {activeTab === 'commercial_launch' && <CommercialLaunchView />}

          {activeTab === 'operating_manual' && <OperatingManualView />}

          {activeTab === 'companies' && (
            <CompaniesView
              companies={companies}
              onCreateCompany={handleCreateCompany}
              currentCompanyId={currentCompanyId}
              onSelectCompany={setCurrentCompanyId}
              onResetPortfolio={fetchCompanies}
            />
          )}

          {activeTab === 'kpis' && <KPIsView kpis={kpis} />}

          {activeTab === 'plays' && <PlaysView />}

          {activeTab === 'jobs' && <JobsView jobs={jobs} />}

          {activeTab === 'evidence' && <EvidenceView evidence={evidence} />}

          {activeTab === 'lazy_larry' && <LazyLarryAssistant companyId={currentCompanyId} />}

          {activeTab === 'opportunity_hunter' && (
            <OpportunityHunterView companyId={currentCompanyId} />
          )}

          {activeTab === 'social_automation' && <SocialAutomationView />}

          {activeTab === 'intelligence' && <IntelligenceView />}

          {activeTab === 'content_studio' && <ContentStudioView />}

          {activeTab === 'automation' && <AutomationWorkflowsView />}
        </main>
      </div>

      <RunCycleModal
        companyId={currentCompanyId}
        isOpen={isRunCycleOpen}
        onClose={() => setIsRunCycleOpen(false)}
        onRunCycleComplete={handleRunCycleComplete}
      />

      <RegisterModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        onSuccess={handleRegisterSuccess}
      />
    </div>
  );
}

export default App;
