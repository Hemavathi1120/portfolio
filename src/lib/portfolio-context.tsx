import React, { createContext, useContext, useState, useEffect } from "react";
import {
  profile as defaultProfile,
  about as defaultAbout,
  education as defaultEducation,
  skillGroups as defaultSkillGroups,
  softSkills as defaultSoftSkills,
  projects as defaultProjects,
  leadership as defaultLeadership,
  contact as defaultContact,
  sections as defaultSections,
  type Project,
} from "./portfolio-data";

export type SectionVisibilityMap = {
  identity: boolean;
  about: boolean;
  experience: boolean;
  work: boolean;
  skills: boolean;
  education: boolean;
  contact: boolean;
  recruiter: boolean;
};

export const defaultSectionsVisibility: SectionVisibilityMap = {
  identity: true,
  about: true,
  experience: true,
  work: true,
  skills: true,
  education: true,
  contact: true,
  recruiter: true,
};

export type PortfolioState = {
  profile: typeof defaultProfile;
  about: typeof defaultAbout;
  education: typeof defaultEducation;
  skillGroups: typeof defaultSkillGroups;
  softSkills: typeof defaultSoftSkills;
  projects: Project[];
  leadership: typeof defaultLeadership;
  contact: typeof defaultContact;
  sectionsVisibility: SectionVisibilityMap;
};

export interface PortfolioContextType extends PortfolioState {
  updateProfile: (updated: Partial<typeof defaultProfile>) => void;
  updateAbout: (updated: Partial<typeof defaultAbout>) => void;
  updateEducation: (updated: typeof defaultEducation) => void;
  updateSkillGroups: (updated: typeof defaultSkillGroups) => void;
  updateSoftSkills: (updated: string[]) => void;
  updateProjects: (updated: Project[]) => void;
  addProject: (project: Project) => void;
  updateProject: (id: string, project: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  updateLeadership: (updated: Partial<typeof defaultLeadership>) => void;
  updateContact: (updated: Partial<typeof defaultContact>) => void;
  toggleSectionVisibility: (sectionId: keyof SectionVisibilityMap, visible?: boolean) => void;
  deleteSection: (sectionId: keyof SectionVisibilityMap) => void;
  resetToDefaults: () => void;
  exportPortfolioData: () => string;
  importPortfolioData: (jsonStr: string) => boolean;
  activeSections: typeof defaultSections;
}

const STORAGE_KEY = "portfolio_admin_custom_data_v2";

const PortfolioContext = createContext<PortfolioContextType | null>(null);

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<PortfolioState>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          return {
            profile: { ...defaultProfile, ...(parsed.profile || {}) },
            about: { ...defaultAbout, ...(parsed.about || {}) },
            education: parsed.education || defaultEducation,
            skillGroups: parsed.skillGroups || defaultSkillGroups,
            softSkills: parsed.softSkills || defaultSoftSkills,
            projects: parsed.projects || defaultProjects,
            leadership: { ...defaultLeadership, ...(parsed.leadership || {}) },
            contact: { ...defaultContact, ...(parsed.contact || {}) },
            sectionsVisibility: { ...defaultSectionsVisibility, ...(parsed.sectionsVisibility || {}) },
          };
        }
      } catch (e) {
        console.error("Failed to load saved portfolio data from localStorage:", e);
      }
    }

    return {
      profile: defaultProfile,
      about: defaultAbout,
      education: defaultEducation,
      skillGroups: defaultSkillGroups,
      softSkills: defaultSoftSkills,
      projects: defaultProjects,
      leadership: defaultLeadership,
      contact: defaultContact,
      sectionsVisibility: defaultSectionsVisibility,
    };
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error("Failed to persist portfolio data to localStorage:", e);
    }
  }, [data]);

  const updateProfile = (updated: Partial<typeof defaultProfile>) => {
    setData((prev) => ({
      ...prev,
      profile: { ...prev.profile, ...updated },
    }));
  };

  const updateAbout = (updated: Partial<typeof defaultAbout>) => {
    setData((prev) => ({
      ...prev,
      about: { ...prev.about, ...updated },
    }));
  };

  const updateEducation = (updated: typeof defaultEducation) => {
    setData((prev) => ({ ...prev, education: updated }));
  };

  const updateSkillGroups = (updated: typeof defaultSkillGroups) => {
    setData((prev) => ({ ...prev, skillGroups: updated }));
  };

  const updateSoftSkills = (updated: string[]) => {
    setData((prev) => ({ ...prev, softSkills: updated }));
  };

  const updateProjects = (updated: Project[]) => {
    setData((prev) => ({ ...prev, projects: updated }));
  };

  const addProject = (project: Project) => {
    setData((prev) => ({
      ...prev,
      projects: [...prev.projects, project],
    }));
  };

  const updateProject = (id: string, project: Partial<Project>) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.map((p) => (p.id === id ? { ...p, ...project } : p)),
    }));
  };

  const deleteProject = (id: string) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.filter((p) => p.id !== id),
    }));
  };

  const updateLeadership = (updated: Partial<typeof defaultLeadership>) => {
    setData((prev) => ({
      ...prev,
      leadership: { ...prev.leadership, ...updated },
    }));
  };

  const updateContact = (updated: Partial<typeof defaultContact>) => {
    setData((prev) => ({
      ...prev,
      contact: { ...prev.contact, ...updated },
    }));
  };

  const toggleSectionVisibility = (sectionId: keyof SectionVisibilityMap, visible?: boolean) => {
    setData((prev) => ({
      ...prev,
      sectionsVisibility: {
        ...prev.sectionsVisibility,
        [sectionId]: visible !== undefined ? visible : !prev.sectionsVisibility[sectionId],
      },
    }));
  };

  const deleteSection = (sectionId: keyof SectionVisibilityMap) => {
    toggleSectionVisibility(sectionId, false);
  };

  const resetToDefaults = () => {
    const defaultState: PortfolioState = {
      profile: defaultProfile,
      about: defaultAbout,
      education: defaultEducation,
      skillGroups: defaultSkillGroups,
      softSkills: defaultSoftSkills,
      projects: defaultProjects,
      leadership: defaultLeadership,
      contact: defaultContact,
      sectionsVisibility: defaultSectionsVisibility,
    };
    setData(defaultState);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      // ignore
    }
  };

  const exportPortfolioData = () => {
    return JSON.stringify(data, null, 2);
  };

  const importPortfolioData = (jsonStr: string): boolean => {
    try {
      const parsed = JSON.parse(jsonStr);
      if (parsed && typeof parsed === "object") {
        setData({
          profile: { ...defaultProfile, ...(parsed.profile || {}) },
          about: { ...defaultAbout, ...(parsed.about || {}) },
          education: parsed.education || defaultEducation,
          skillGroups: parsed.skillGroups || defaultSkillGroups,
          softSkills: parsed.softSkills || defaultSoftSkills,
          projects: parsed.projects || defaultProjects,
          leadership: { ...defaultLeadership, ...(parsed.leadership || {}) },
          contact: { ...defaultContact, ...(parsed.contact || {}) },
          sectionsVisibility: { ...defaultSectionsVisibility, ...(parsed.sectionsVisibility || {}) },
        });
        return true;
      }
    } catch (e) {
      console.error("Invalid JSON for portfolio import:", e);
    }
    return false;
  };

  // Compute active navigation sections based on visibility
  const activeSections = defaultSections.filter(
    (s) => data.sectionsVisibility[s.id as keyof SectionVisibilityMap] !== false
  );

  return (
    <PortfolioContext.Provider
      value={{
        ...data,
        updateProfile,
        updateAbout,
        updateEducation,
        updateSkillGroups,
        updateSoftSkills,
        updateProjects,
        addProject,
        updateProject,
        deleteProject,
        updateLeadership,
        updateContact,
        toggleSectionVisibility,
        deleteSection,
        resetToDefaults,
        exportPortfolioData,
        importPortfolioData,
        activeSections,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error("usePortfolio must be used within a PortfolioProvider");
  }
  return context;
}
