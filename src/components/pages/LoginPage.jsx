import LoginForm from "../LoginForm";

const LoginPage = () => {
  return (
    <>
      <div className="flex font-roboto">
        <div className="w-1/2 h-screen bg-myblack text-white">
          <div className="w-full h-full flex flex-col items-end justify-center">
            <p className="text-3xl">THE</p>
            <p className="text-5xl">KONTRAKTOR BILINGER</p>
            <p className="text-3xl">MANAGEMENT APP</p>
          </div>
        </div>
        <div className="w-1/2 h-screen">
          <LoginForm />
        </div>
      </div>
    </>
  );
};

export default LoginPage;
