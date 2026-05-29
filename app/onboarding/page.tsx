export const dynamic = 'force-dynamic';

import { Suspense } from 'react';
import { OnboardingClient } from './OnboardingClient';

export default function OnboardingPage() {
  return (
    <Suspense>
      <OnboardingClient />
    </Suspense>
  );
}
