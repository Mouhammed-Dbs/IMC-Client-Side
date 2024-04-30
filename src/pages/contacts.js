import { Button } from "@nextui-org/react";
import Image from "next/image";


export default function Contacts() {
    return (
        <div className="shadow-2xl m-4 pb-2 border-1 ">
            <p className='text-2xl p-3 pr-10 border-b-3' style={{ direction: 'rtl' }}>اتصل بنا </p>
            <p className="m-auto md:mr-48 text-lg pr-4 w-[400px] text-slate-700" style={{ direction: 'rtl' }} >
                هذه الاستمارة معدة فقط للتوجه والاتصال بادارة موقع وشركة IMCفي مواضيع ادارية وتجارية فقط.
                رجاءا عدم طرح اسئلة أو استشارات طبية هنا
            </p>
            <div className="flex justify-center">
                <div className="px-7 py-4 text-lg text-gray-700 w-[400px] rounded-xl md:block hidden">
                    {/* <Image src={'/image/logo/logo-512.png'} width={1200} height={1200} alt={'IMC logo'} className="w-36 h-36 ml-auto px-3" /> */}
                    <p style={{ direction: 'rtl' }} >
                        هذه الاستمارة معدة فقط للتوجه والاتصال بادارة موقع وشركة IMCفي مواضيع ادارية وتجارية فقط. رجاءا عدم طرح اسئلة أو استشارات طبية هنا
                    </p>
                </div>

                <form className="max-w-md mt-2 p-3  " style={{ direction: 'rtl' }}>
                    <input
                        onSubmit={() => { }}
                        className="w-full border border-gray-700 rounded px-3 py-1 mb-4"
                        type="text"
                        name="name"
                        placeholder="الاسم"
                    />
                    <input
                        onSubmit={() => { }}
                        className="w-full border border-gray-700 rounded px-3 py-1 mb-4"
                        type="text"
                        name="username"
                        placeholder="اسم المستخدم "
                    />
                    <input
                        className="w-full border border-gray-700 rounded px-3 py-1 mb-4"
                        type="email"
                        name="email "
                        placeholder="البريد الالكتروني "
                    />
                    <textarea className="w-full border border-gray-700 rounded px-3 pb-6 p mb-4  "
                        type="text"
                        placeholder="الموضوع"
                    />
                    <div className="flex justify-center">
                        <Button
                            className="text-white rounded-2xl bg-slate-700 px-4 py-3 mx-1 font-bold self-center ">
                            ارسال
                        </Button>
                    </div>

                </form>
            </div>




        </div>
    )

}