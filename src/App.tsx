/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { AboutSection } from './components/AboutSection';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { Navbar } from './components/Navbar';
import { PathfinderSection } from './components/PathfinderSection';
import { TrainingSection } from './components/TrainingSection';
import { exportEditablePdf } from './utils/exportEditablePdf';

export default function App() {
  const [isExporting, setIsExporting] = useState(false);
  const [exportError, setExportError] = useState<string | null>(null);

  const handleDownloadPdf = async () => {
    if (isExporting) return;
    setExportError(null);
    setIsExporting(true);

    try {
      await exportEditablePdf();
    } catch {
      setExportError('Could not generate the editable PDF. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FBF8F1] text-[#1F1B18] print:min-h-0 print:bg-white">
      <Navbar />
      <main>
        <HeroSection />
        <PathfinderSection />
        <TrainingSection />
        <AboutSection />
      </main>
      <Footer
        onDownloadPdf={handleDownloadPdf}
        isExporting={isExporting}
        exportError={exportError}
      />
    </div>
  );
}
