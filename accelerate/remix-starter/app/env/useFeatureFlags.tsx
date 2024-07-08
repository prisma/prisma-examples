import { useContext, useMemo } from "react";

import { UserContext } from "../hooks/useUser";
import { UserFeatureFlags } from "./userFeatureFlags.server";
import { GLOBAL_ENV, GlobalEnv } from "./globalEnv";

export default function useFeatureFlags() {
  const userContext = useContext(UserContext);

  return useMemo(
    () => ({
      // Check the CLIENT_ENV object for feature flags
      hasGlobalFeatureFlag: (flag: keyof GlobalEnv): boolean =>
        !!GLOBAL_ENV[flag],
      // Get a value from CLIENT_ENV object
      getGlobalFeatureFlag: <T extends keyof GlobalEnv>(
        flag: T,
      ): GlobalEnv[T] => GLOBAL_ENV[flag],
      // Check the current user feature flags. If there's no user, this returns false, always
      hasUserFeatureFlag: (flag: keyof UserFeatureFlags): boolean =>
        !!userContext?.featureFlags?.[flag],
      // Get the current user feature flag value. If there's no user, this returns undefined, always
      getUserFeatureFlag: <T extends keyof UserFeatureFlags>(
        flag: T,
      ): UserFeatureFlags[T] | undefined => userContext?.featureFlags?.[flag],
    }),
    [userContext?.featureFlags],
  );
}
