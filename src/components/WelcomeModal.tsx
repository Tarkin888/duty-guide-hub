import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { BookOpen, CheckSquare, FileText, BarChart3, ArrowRight, ArrowLeft, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const ONBOARDED_KEY = "cd-playbook-onboarded";

interface WelcomeModalProps {
  forceOpen?: boolean;
  onClose?: () => void;
}

const tourSteps = [
  {
    icon: Sparkles,
    title: "Welcome to the Consumer Duty Compliance Hub",
    description: "Your working environment for running and evidencing FCA Consumer Duty as business-as-usual, and for preparing the annual board attestation.",
    highlight: "Let's take a quick tour of the key features.",
  },
  {
    icon: BookOpen,
    title: "Knowledge Base Modules",
    description: "20 modules across 6 phases act as your knowledge base and onboarding reference. Each module contains checklists, templates and regulatory guidance you can return to at any time.",
    highlight: "Use the Foundation phase when onboarding new colleagues or revisiting your framework.",
  },
  {
    icon: CheckSquare,
    title: "Track Your Progress",
    description: "Check off tasks as you complete them. Your progress is automatically saved and displayed on the dashboard. Monitor completion across all phases and modules.",
    highlight: "Progress persists between sessions so you can pick up where you left off.",
  },
  {
    icon: FileText,
    title: "Ready-to-Use Templates",
    description: "Access professionally designed templates for gap analysis, policy frameworks, board reports, and more. Download and customise them for your organisation.",
    highlight: "Find templates in each module or browse the full library.",
  },
  {
    icon: BarChart3,
    title: "Dashboard & Reporting",
    description: "Your dashboard shows the annual attestation cycle and your evidence coverage. Export reports for board presentations and regulatory evidence.",
    highlight: "You're all set. Start with the Annual Attestation Cycle on the dashboard.",
  },
];

export function WelcomeModal({ forceOpen = false, onClose }: WelcomeModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [dontShowAgain, setDontShowAgain] = useState(false);

  useEffect(() => {
    if (forceOpen) {
      setIsOpen(true);
      setCurrentStep(0);
      return;
    }

    const hasOnboarded = localStorage.getItem(ONBOARDED_KEY);
    if (!hasOnboarded) {
      setIsOpen(true);
    }
  }, [forceOpen]);

  const handleClose = () => {
    if (dontShowAgain || currentStep === tourSteps.length - 1) {
      localStorage.setItem(ONBOARDED_KEY, "true");
    }
    setIsOpen(false);
    setCurrentStep(0);
    onClose?.();
  };

  const handleNext = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    localStorage.setItem(ONBOARDED_KEY, "true");
    setIsOpen(false);
    onClose?.();
  };

  const currentTour = tourSteps[currentStep];
  const IconComponent = currentTour.icon;
  const isLastStep = currentStep === tourSteps.length - 1;
  const isFirstStep = currentStep === 0;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
            <IconComponent className="h-8 w-8 text-primary" />
          </div>
          <DialogTitle className="text-xl">{currentTour.title}</DialogTitle>
          <DialogDescription className="text-base leading-relaxed">
            {currentTour.description}
          </DialogDescription>
          {currentTour.highlight && (
            <p className="text-sm font-medium text-primary bg-primary/5 px-4 py-2 rounded-lg">
              {currentTour.highlight}
            </p>
          )}
        </DialogHeader>

        {/* Progress dots */}
        <div className="flex justify-center gap-2 py-4">
          {tourSteps.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentStep(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentStep
                  ? "bg-primary w-6"
                  : index < currentStep
                  ? "bg-primary/60"
                  : "bg-muted-foreground/30"
              }`}
              aria-label={`Go to step ${index + 1}`}
            />
          ))}
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          {isFirstStep ? (
            <Button variant="ghost" onClick={handleSkip} className="sm:mr-auto">
              Skip tour
            </Button>
          ) : (
            <Button variant="ghost" onClick={handlePrev} className="sm:mr-auto">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          )}

          {isLastStep ? (
            <Button asChild onClick={handleClose}>
              <Link to="/foundation/readiness">
                Get Started
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          ) : (
            <Button onClick={handleNext}>
              Next
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          )}
        </DialogFooter>

        {isFirstStep && (
          <div className="flex items-center justify-center gap-2 pt-2 border-t">
            <Checkbox
              id="dont-show"
              checked={dontShowAgain}
              onCheckedChange={(checked) => setDontShowAgain(checked as boolean)}
            />
            <label htmlFor="dont-show" className="text-sm text-muted-foreground cursor-pointer">
              Don't show this again
            </label>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

// Export a function to reset the onboarding flag (for replay)
export function resetOnboarding() {
  localStorage.removeItem(ONBOARDED_KEY);
}

// Export a function to check if user has onboarded
export function hasOnboarded(): boolean {
  return localStorage.getItem(ONBOARDED_KEY) === "true";
}
