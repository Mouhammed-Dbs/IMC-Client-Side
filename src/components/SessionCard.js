import React from "react";
import { Card, CardHeader, CardBody, CardFooter, Avatar, Button } from "@nextui-org/react";

export default function SessionCard() {
    return (

        <div class="inline-block px-3">
            <div
                class="w-80 h-64 max-w-xs overflow-hidden rounded-lg bg-slate-200 "
            >
                <div className="p-5 text-lg font-bold ">
                    <p>Session One</p>
                    <p>Doctor Name</p>
                    <p>Session Date</p>
                    <p>Session Date</p>

                </div>
                <Button
                    className="block m-auto  text-lg bg-slate-700 text-white px-8 relative top-5 "
                    radius="full"
                >
                    Edit
                </Button>
            </div>

        </div>







    );
}
