import SmoothScroll from '@/components/SmoothScroll';
import IntroSection from '@/components/IntroSection';
import FloatingGallery from '@/components/FloatingGallery';
import MagneticNote from '@/components/MagneticNote';
import FloatingHearts from '@/components/FloatingHearts';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <SmoothScroll>
      <main className="relative min-h-screen overflow-x-hidden bg-gradient-sunset">
        {/* Floating hearts effect */}
        <FloatingHearts />

        {/* Section 1: The Breath - Intro */}
        <IntroSection name="My Love" />

        {/* Section 2: Floating Gallery with Parallax */}
        <FloatingGallery />

        {/* Section 3: Magnetic Love Note */}
        <MagneticNote />

        {/* Footer */}
        <Footer />
      </main>
    </SmoothScroll>
  );
};

export default Index;
