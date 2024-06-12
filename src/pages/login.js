import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Select, SelectItem, Spinner } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { isUserLogged, loginUser, registerUser } from "../../public/global_functions/auth";

export default function Login() {
  const router = useRouter();
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ error: false, message: "" });
  const [inputLoginEmail, setInputLoginEmail] = useState(null);
  const [inputLoginPass, setInputLoginPass] = useState(null);
  const [inputsignName, setInputSignName] = useState(null);
  const [inputsignUsername, setInputSignUsername] = useState(null);
  const [inputsignEmail, setInputSignEmail] = useState(null);
  const [inputsignPass, setInputSignPass] = useState(null);
  const [inputSelectAge, setInputAge] = useState(null);
  const [genderSelected, setGenderSelected] = useState("male");
  const [pageLoading, setPageLoading] = useState(true);
  const ages = Array.from({ length: 70 }, (_, i) => ({
    value: `${i + 1}`,
  }));
  useEffect(() => {
    isUserLogged()
      .then((result) => {
        if (!result.error) {
          router.replace("/");
        } else {
          setPageLoading(false);
        }

      })
      .catch(async (err) => {
        setPageLoading(false);
      });
  }, []);
  if (pageLoading) {
    return (
      <div className="flex items-center justify-center w-screen h-screen">
        <Spinner />
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center relative top-16 w-full flex-1 px-5 md:px-20 text-center">
      <div className="bg-white rounded-2xl shadow-2xl flex justify-center flex-grow w-full max-w-4xl max-w-11/12 md:max-w-[700px]">
        <div className="w_full md:w-3/5 p-5">
          <h1 className="text-4xl font-bold text-center mt-5 text-black ">
            {isLoginForm ? "Login" : "Sign Up"}
          </h1>
          <div className="border-2 w-10 border-black inline-block mt-5"></div>
          {isLoginForm ? (
            <form
              className="max-w-md mx-auto p-3 mt-10"
              onSubmit={async (e) => {
                e.preventDefault();
                try {
                  setLoading(true);
                  const res = await loginUser(inputLoginEmail, inputLoginPass);
                  if (!res.error) {
                    localStorage.setItem("user-token", res.token);
                    router.push("/account");
                  } else {
                    setAlert({ error: res.error, message: res.message });
                  }
                  setLoading(false);
                } catch (err) {
                  setLoading(false);
                  if (err?.response?.status === 401) {
                    console.log(err?.response?.data.message);
                    setAlert({
                      error: true,
                      message: err?.response?.data.message,
                    });
                  } else {
                    <p>{alert.message}</p>
                  }
                }
              }}
            >
              <input
                onChange={(e) => setInputLoginEmail(e.target.value)}
                className="w-full border border-gray-700 rounded px-3 py-2 mb-4"
                type="text"
                name="username"
                placeholder="username"
              />
              <input
                onChange={(e) => setInputLoginPass(e.target.value)}
                className="w-full border border-gray-700 rounded px-3 py-2 mb-4"
                type="password"
                name="password"
                placeholder="password"
              />
              <Button
                isDisabled={!(inputLoginEmail && inputLoginPass) || loading}
                className="bg-blue-500 text-white hover:text-blue-500 hover:bg-white hover:border-2 hover:border-blue-500 font-bold py-2 px-4 rounded-large mt-5"
                type="submit"
              >
                {loading ? "Login..." : "Login"}
              </Button>

            </form>
          ) : (
            <form
              className="max-w-md mx-auto mt-2 p-3"
              onSubmit={async (e) => {
                e.preventDefault();
                try {
                  setLoading(true);
                  const res = await registerUser(
                    inputsignName,
                    inputsignEmail,
                    inputsignUsername,
                    inputsignPass,
                    inputSelectAge,
                    genderSelected
                  );
                  if (!res.error) {
                    localStorage.setItem("user-token", res.token);
                    router.push("/account");
                  } else {
                    setAlert({ error: res.error, message: res.message });

                  }
                  setLoading(false);
                } catch (err) {
                  setLoading(false);
                  if (err?.response?.status === 401) {
                    setAlert({
                      error: true,
                      message: err.response.data.message,
                    });
                  } else {
                    console.error(err);
                  }
                }
              }}
            >
              <input
                onChange={(e) => setInputSignName(e.target.value)}
                className="w-full border border-gray-700 rounded px-3 py-1 mb-4"
                type="text"
                name="namee"
                placeholder="Name"
                autocomplete="off"
              />
              <input
                onChange={(e) => setInputSignUsername(e.target.value)}
                className="w-full border border-gray-700 rounded px-3 py-1 mb-4"
                type="text"
                name="usernamee"
                placeholder="Username"
                  autocomplete="off"
              />
              <input
                onChange={(e) => setInputSignEmail(e.target.value)}
                className="w-full border border-gray-700 rounded px-3 py-1 mb-4"
                type="email"
                name="emaill "
                placeholder="Email"
              />
              <input
                onChange={(e) => setInputSignPass(e.target.value)}
                className="w-full border border-gray-700 rounded px-3 py-1 mb-4"
                type="password"
                name="passwordd"
                placeholder="Password"
              />
              <div className="flex gap-5">
                <Select
                  selectedKeys={[genderSelected]}
                  onChange={(e) => {
                    setGenderSelected(e.target.value);
                  }}
                  disallowEmptySelection={true}
                  aria-label="none"
                  style={{ backgroundColor: "inherit" }}
                  size="sm"
                  labelPlacement="outside"
                  placeholder="GENDER"
                  classNames={{
                    base: "px-[2px] max-w-xs peer w-1/2 self-center rounded-lg border-2 dark:border-slate-400 border-black border-opacity-55 text-xs bg-inherit",
                    trigger: "",
                  }}
                >
                  <SelectItem key={"male"}>Male</SelectItem>
                  <SelectItem key={"female"}>Female</SelectItem>
                </Select>
                <Select
                  onChange={(e) => setInputAge(e.target.value)}
                  disallowEmptySelection={true}
                  aria-label="none"
                  style={{ backgroundColor: "inherit" }}
                  size="sm"
                  labelPlacement="outside"
                  placeholder="AGE"
                  classNames={{
                    base: "px-[2px] max-w-xs peer w-1/2 self-center rounded-lg border-2 dark:border-slate-400 border-black border-opacity-55 text-xs bg-inherit",
                    trigger: "",
                  }}
                >
                  {ages.map((item) => (
                    <SelectItem key={item.value}>{item.value}</SelectItem>
                  ))}
                </Select>
              </div>
              <Button
                isDisabled={!(inputsignName && inputsignEmail &&
                  inputsignUsername &&
                  inputsignPass &&
                  inputSelectAge) || loading}
                className="bg-blue-500 text-white hover:text-blue-500 hover:bg-white hover:border-2 hover:border-blue-500 font-bold py-2 px-4 rounded-large mt-5"
                type="submit"
              >
                {loading ? "Signing.." : "Signup"}
              </Button>
              {alert.error && (
                <p className="text-red-500 mt-3">{alert.message}</p>
              )}

            </form>
          )}
        </div>
        <div className=" md:w-2/3 md-h bg-blue-500 text-white rounded-tr-2xl py-36 px-12 hidden md:block">
          <h2 className="text-3xl font-bold mb-2">Hello Frind</h2>
          <span className="border-1 w-20 border-white inline-block mb-2"></span>
          <p>
            {isLoginForm ? "Don't have accont?" : "You have alerdy account"}
          </p>
          <button
            className="border-white font-bold border-2 rounded-large px-5 py-2 mt-5 hover:bg-white hover:text-blue-500 "
            onClick={() => {
              setIsLoginForm(!isLoginForm);
              setAlert({ error: false, message: "" });
            }}
          >
            {isLoginForm ? "Sign up" : "login"}
          </button>
        </div>
      </div>
      <p
        className="text-center p-2 my-3 rounded-lg underline md:hidden "
        onClick={() => {
          setIsLoginForm(!isLoginForm);
        }}
      >
        {!isLoginForm ? "You have alerdy account" : "You Don`t have acount"}
      </p>
    </div>
  );
}
