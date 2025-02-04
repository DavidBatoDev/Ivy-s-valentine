import { useEffect } from 'react';

export const useModalTransitions = ({
  stages,
  navigate,
  intervalDuration = 5000
}) => {
  useEffect(() => {
    const interval = setInterval(() => {
      // Find the current active stage
      const activeStageIndex = stages.findIndex(stage => stage.condition);
      
      if (activeStageIndex !== -1) {
        const currentStage = stages[activeStageIndex];
        
        // Disable current stage
        currentStage.setCondition(false);
        
        // Trigger next stage or navigation
        setTimeout(() => {
          // If there's a specific next stage function, call it
          if (currentStage.nextStage) {
            currentStage.nextStage();
          }
          
          // If there's a navigation path and navigate function, navigate
          if (currentStage.navigationPath && navigate) {
            navigate(currentStage.navigationPath);
          }
        }, 100);
      }
    }, intervalDuration);

    return () => clearInterval(interval);
  }, [stages, navigate, intervalDuration]);

  return stages;
};