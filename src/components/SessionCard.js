import React from "react";
import { Card, CardHeader, CardBody, CardFooter, Avatar, Button } from "@nextui-org/react";

export default function SessionCard({ order, doctorName, statusFinished, progress, creationDate, finishingDate }) {
    return (
        <div
            className="w-80 h-fit rounded-lg bg-white shadow-md block min-w-72 p-4"
        >
            <p className={`flex justify-center items-center h-12 w-12 rounded-full m-auto border-1 border-slate-600 text-white ${statusFinished ? "bg-gray-500" : "bg-green-500/80"}`}>{order}</p>
            <div className="flex flex-col justify-center py-5 px-2 h-[150px]">
                <div className="flex gap-1">
                    <p className="font-bold">Dr name:</p>
                    <p className="self-end">{doctorName}</p>
                </div>
                <div className="flex gap-1">
                    <p className="font-bold">Status:</p>
                    <p className={`self-end ${statusFinished ? 'text-red-500' : 'text-green-500'}`}>{statusFinished ? "Finished" : "Opened"}</p>
                </div>
                <div className="flex gap-1">
                    <p className="font-bold">Progress:</p>
                    <p className="self-end">{progress}</p>
                </div>
                <div className="flex gap-1">
                    <p className="font-bold">Creation date:</p>
                    <p className="self-end">{creationDate}</p>
                </div>
                {statusFinished && <div className="flex gap-1">
                    <p className="font-bold">Finishing date:</p>
                    <p className="self-end">{finishingDate}</p>
                </div>}


            </div>
            <Button
                className={`block m-auto bg-slate-700 text-white px-8`}
                radius="full"
                size="sm"
            >
                Edit
            </Button>
        </div>







    );
}
