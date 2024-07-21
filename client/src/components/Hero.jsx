// import { toast } from "react-toastify";
import { useToast } from "../context/ToastContext";

function Hero() {
  const notify = useToast();

  return (
    <div>
      Hero
      <div>
        <button onClick={() => notify.success("First Toast!")}>
          Show First Toast
        </button>
        <button
          onClick={() => notify.success("🔥  Second Toast!", { icon: false })}
        >
          Show Second Toast
        </button>
      </div>
    </div>
  );
}

export default Hero;
