import { useState } from "react";
import { useRouter } from "next/router";
import { Select, SelectItem } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { loginUser, registerUser } from "../../public/global_functions/auth";

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
  const ages = Array.from({ length: 70 }, (_, i) => ({
    value: `${i + 1}`,
  }));
  return (
    <div className="flex flex-col items-center relative top-16 w-full flex-1 px-5 md:px-20 text-center">
      <div className="bg-white rounded-2xl shadow-2xl flex flex-grow w-full md:w-2/3 max-w-4xl ">
        <div className="w_full md:w-3/5 p-5">
          <h1 className="text-4xl font-bold text-center mt-5 text-black ">
            {isLoginForm ? "Login" : "Sign Up"}
          </h1>
          <div className="border-2 w-10 border-black inline-block mt-5"></div>
          {isLoginForm ? (
            <form
              className="max-w-md mx-auto mt-2 p-3"
              onSubmit={async (e) => {
                e.preventDefault();
                try {
                  setLoading(true);
                  const res = await loginUser(inputLoginEmail, inputLoginPass);
                  if (!res.error) {
                    localStorage.setItem("user-token", res.token);
                    router.replace("/account");
                  } else {
                    setAlert({ error: res.error, message: res.message });
                    console.log(res.message);
                  }
                  setLoading(false);
                } catch (err) {
                  setLoading(false);
                  if (err.response.status === 401) {
                    console.log(err.response.data.message);
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
                className="hover:bg-slate-700 border-2 border-slate-700 hover:border-slate-500 text-slate-700 hover:text-white font-bold py-2 px-4 rounded-large mt-5"
                type="submit"
              >
                {loading ? "Login..." : "Login"}
              </Button>
              {alert.error && (
                <p className="text-red-500 mt-3">{alert.message}</p>
              )}
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
                    router.replace("/account");
                  } else {
                    setAlert({ error: res.error, message: res.message });
                    console.log(res.message);
                  }
                  setLoading(false);
                } catch (err) {
                  setLoading(false);
                  if (err?.response?.status === 401) {
                    console.log(err.response.data.message);
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
                name="name"
                placeholder="Name"
              />
              <input
                onChange={(e) => setInputSignUsername(e.target.value)}
                className="w-full border border-gray-700 rounded px-3 py-1 mb-4"
                type="text"
                name="username"
                placeholder="Username"
              />
              <input
                onChange={(e) => setInputSignEmail(e.target.value)}
                className="w-full border border-gray-700 rounded px-3 py-1 mb-4"
                type="email"
                name="email "
                placeholder="Email"
              />
              <input
                onChange={(e) => setInputSignPass(e.target.value)}
                className="w-full border border-gray-700 rounded px-3 py-1 mb-4"
                type="password"
                name="password"
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
                className="hover:bg-slate-700 border-2 border-slate-700 hover:border-slate-500 text-slate-700 hover:text-white font-bold py-2 px-4 rounded-large mt-5"
                type="submit"
              >
                Signup
              </Button>
              {alert.error && (
                <p className="text-red-500 mt-3">{alert.message}</p>
              )}
            </form>
          )}
        </div>
        <div className=" md:w-2/3 md-h bg-slate-700 text-white rounded-tr-2xl py-36 px-12 hidden md:block">
          <h2 className="text-3xl font-bold mb-2">Hello Frind</h2>
          <span className="border-1 w-20 border-white inline-block mb-2"></span>
          <p>
            {isLoginForm ? "Don't have accont?" : "You have alerdy account"}
          </p>
          <button
            className="border-white font-bold border-2 rounded-large px-5 py-2 mt-5 hover:bg-slate-100 hover:text-slate-700 hover:border-slate-500"
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
