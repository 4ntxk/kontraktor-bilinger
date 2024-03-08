import LoginForm from "../LoginForm";

const LoginPage = () => {
  return (
    <>
      <div className="flex">
        <div className="w-1/2 h-screen bg-red-500">chuj</div>
        <div className="w-1/2 h-screen">
          <LoginForm />
        </div>
      </div>
    </>
  );
};

export default LoginPage;
