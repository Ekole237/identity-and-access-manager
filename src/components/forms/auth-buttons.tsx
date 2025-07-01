import { GhBtn } from "./gh-btn";
import { GoogleBtn } from "./google-btn";

export const AuthButtons = () => {
  return (
    <div className="flex flex-col items-center space-y-4">
      <p className="text-sm">Se connecter avec</p>
      <div className="flex flex-1 items-center justify-center gap-4">
        <GoogleBtn />
        <GhBtn />
      </div>
    </div>
  );
};
