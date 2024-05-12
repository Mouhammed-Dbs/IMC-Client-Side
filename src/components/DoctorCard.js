import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Avatar,
  Button,
} from "@nextui-org/react";
export default function DoctorCard({ name, username, gender, des, srcImg }) {
  return (
    <Card className="m-2 min-w-[200px] md:min-w-[350px] p-4">
      <CardHeader className="flex justify-center items-center gap-3">
        <div className="">
          <Avatar
            isBordered
            radius="full"
            size="lg"
            src={srcImg}
            className="block m-auto"
          />
          <div className="flex flex-col gap-1 items-center justify-end">
            <h4 className="text-xl font-semibold leading-none text-default-600 mt-4">
              {name}
            </h4>
            <h5 className="text-gray-500">@{username}</h5>
            <h5 className="text-gray-500">{gender}</h5>
          </div>
        </div>
      </CardHeader>
      <CardBody className="px-3 py-0 text-small text-default-400">
        <p className="h-16 text-center">{des}</p>
      </CardBody>
      <CardFooter className="gap-3">
        <Button
          className="block m-auto text-lg bg-slate-700 text-white px-8"
          radius="full"
        >
          Select
        </Button>
      </CardFooter>
    </Card>
  );
}
