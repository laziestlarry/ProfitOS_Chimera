import React, { useState, useEffect } from 'react';
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
import { RunCycleModal } from './components/RunCycleModal';
import { Company, KPIRecord, Job, EvidenceRecord } from './types';

export function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('overview');
  const [companies, setCompanies] = useState<Company[]>([]);
  const [currentCompanyId, setCurrentCompanyId] = useState<string>('autonoma-x');
  const [kpis, setKpis] = useState<KPIRecord[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [evidence, setEvidence] = useState<EvidenceRecord[]>([]);
  const [apiStatus, setApiStatus] = useState<string>('Connected');
  const [isRunCycleOpen, setIsRunCycleOpen] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  // Load Companies
  const fetchCompanies = async () => {
    try {
      const res = await fetch('/api/v1/companies');
      if (res.ok) {
        const data = await res.json();
        setCompanies(data);
        if (data.length > 0 && !data.find((c: Company) => c.id === currentCompanyId)) {
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

        <main className="flex-1 p-6 md:p-8 overflow-y-auto max-w-7xl mx-auto w-full">
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

          {activeTab === 'companies' && (
            <CompaniesView
              companies={companies}
              onCreateCompany={handleCreateCompany}
              currentCompanyId={currentCompanyId}
              onSelectCompany={setCurrentCompanyId}
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
    </div>
  );
}

export default App;
