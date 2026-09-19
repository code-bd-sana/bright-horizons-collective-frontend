'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import type { AddChildWizardState } from '../model/child-profile.types';

const STORAGE_KEY = 'bhc_add_child_wizard_state';

const initialWizardState: AddChildWizardState = {
  photoFile: null,
  photoPreview: null,
  photoUrl: null,
  nickname: '',
  gender: '',
  ageYears: '',
  ageMonths: '',

  caregiverName: '',
  relationship: '',
  email: '',
  country: 'US',
  phone: '',

  areasOfSupport: [],
  notes: '',

  favorites: [],
  activityTypes: [],
};

type AddChildContextType = {
  state: AddChildWizardState;
  updateStep1: (values: {
    nickname: string;
    gender?: string;
    ageYears: string;
    ageMonths: string;
    photoFile?: File | null;
    photoPreview?: string | null;
  }) => void;
  updateStep2: (values: {
    caregiverName: string;
    relationship: string;
    email: string;
    country: string;
    phone: string;
  }) => void;
  updateStep3: (values: { areasOfSupport: string[]; notes?: string }) => void;
  updateStep4: (values: { favorites: string[]; activityTypes: string[] }) => void;
  setPhotoUrl: (url: string) => void;
  reset: () => void;
};

const AddChildContext = createContext<AddChildContextType | null>(null);

export function AddChildProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AddChildWizardState>(() => {
    if (typeof window === 'undefined') return initialWizardState;
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return { ...initialWizardState, ...parsed, photoFile: null };
      }
    } catch {
      // ignore JSON parse errors
    }
    return initialWizardState;
  });

  useEffect(() => {
    try {
      const serializableState = { ...state, photoFile: null };
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(serializableState));
    } catch {
      // ignore storage errors
    }
  }, [state]);

  const updateStep1 = (values: {
    nickname: string;
    gender?: string;
    ageYears: string;
    ageMonths: string;
    photoFile?: File | null;
    photoPreview?: string | null;
  }) => {
    setState((prev) => ({
      ...prev,
      nickname: values.nickname,
      gender: values.gender ?? '',
      ageYears: values.ageYears,
      ageMonths: values.ageMonths,
      photoFile: values.photoFile !== undefined ? values.photoFile : prev.photoFile,
      photoPreview: values.photoPreview !== undefined ? values.photoPreview : prev.photoPreview,
    }));
  };

  const updateStep2 = (values: {
    caregiverName: string;
    relationship: string;
    email: string;
    country: string;
    phone: string;
  }) => {
    setState((prev) => ({
      ...prev,
      caregiverName: values.caregiverName,
      relationship: values.relationship,
      email: values.email,
      country: values.country,
      phone: values.phone,
    }));
  };

  const updateStep3 = (values: { areasOfSupport: string[]; notes?: string }) => {
    setState((prev) => ({
      ...prev,
      areasOfSupport: values.areasOfSupport,
      notes: values.notes ?? '',
    }));
  };

  const updateStep4 = (values: { favorites: string[]; activityTypes: string[] }) => {
    setState((prev) => ({
      ...prev,
      favorites: values.favorites,
      activityTypes: values.activityTypes,
    }));
  };

  const setPhotoUrl = (url: string) => {
    setState((prev) => ({ ...prev, photoUrl: url }));
  };

  const reset = () => {
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {}
    setState(initialWizardState);
  };

  return (
    <AddChildContext.Provider
      value={{
        state,
        updateStep1,
        updateStep2,
        updateStep3,
        updateStep4,
        setPhotoUrl,
        reset,
      }}
    >
      {children}
    </AddChildContext.Provider>
  );
}

export function useAddChildWizard() {
  const context = useContext(AddChildContext);
  if (!context) {
    throw new Error('useAddChildWizard must be used within an AddChildProvider');
  }
  return context;
}
