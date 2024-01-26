"use client";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/app/_components/ui/select";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";

const Notify = () => {
  const [notfiyEnabled, setNotifyEnabled] = useState<boolean>(false);
  const [notificationPeriod, setNotificationPeriod] = useState("1");
  const [emailEnabled, setEmailEnabled] = useState(false);
  const [email, setEmail] = useState("");
  const [textEnabled, setTextEnabled] = useState(false);
  const [text, setText] = useState("");

  useEffect(() => {
    console.log({
      notfiyEnabled,
      notificationPeriod,
      emailEnabled,
      email,
      textEnabled,
      text,
    });
  }, [
    notfiyEnabled,
    notificationPeriod,
    emailEnabled,
    email,
    textEnabled,
    text,
  ]);

  useEffect(() => {
    if (!notfiyEnabled) {
      setEmailEnabled(false);
      setTextEnabled(false);
    }
  }, [notfiyEnabled]);

  const formatEmail = (email: string) => {
    const parts = email.split("@").slice(0, 2);
    return parts.join("@");
  };

  const formatPhoneNumber = (phoneNumber: string) => {
    const digits = phoneNumber.replace(/\D/g, "");
    const trimmed = digits.substring(0, 10);

    const part1 = trimmed.substring(0, 3);
    const part2 = trimmed.substring(3, 6);
    const part3 = trimmed.substring(6, 10);

    return `${part1}${part2 ? "-" : ""}${part2}${part3 ? "-" : ""}${part3}`;
  };

  return (
    <div className="pl-16">
      <div className="items-top flex space-x-2">
        <Checkbox
          id="notfiyEnabled"
          className="border-green-500"
          onClick={() => setNotifyEnabled(!notfiyEnabled)}
          checked={notfiyEnabled === true}
        />
        <div className="grid gap-1.5 leading-none">
          <label
            htmlFor="email"
            className="flex text-sm font-medium leading-none text-green-500 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Notify me updates for this item every
            {/* <Select
              value={notificationPeriod.toString()}
              onValueChange={setNotificationPeriod}
              noIcon={true}
            >
              <SelectTrigger className="mx-2 h-4 w-auto border-none bg-blue-900">
                <SelectValue>{notificationPeriod}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                  <SelectItem value="7">7</SelectItem>
                  <SelectItem value="30">30</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>{" "} */}
            {notificationPeriod === "1" ? "day" : "days"}
          </label>
          {/* <p className="text-sm text-muted-foreground">
            You agree to our Terms of Service and Privacy Policy.
          </p> */}
        </div>
      </div>
      <div className="max-w-md pl-8 pt-4">
        <div className="items-top flex space-x-2">
          <Checkbox
            id="email"
            className="border-green-500"
            disabled={!notfiyEnabled}
            onClick={() => setEmailEnabled(!emailEnabled)}
            checked={emailEnabled}
          />
          <div
            className="flex w-full justify-between gap-1.5 leading-none"
            style={{
              opacity: notfiyEnabled ? 1 : 0.5,
            }}
          >
            <label
              htmlFor="email"
              className="text-sm font-medium leading-none text-green-500 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Send me email updates
            </label>
            {notfiyEnabled ? (
              <Input
                disabled={!emailEnabled}
                value={email}
                onChange={(e) => setEmail(formatEmail(e.target.value))}
                className="mr-4 h-4 w-[180px] rounded-none text-black"
              />
            ) : null}
          </div>
        </div>
        <div className="p-2"></div>
        <div className="items-top flex space-x-2">
          <Checkbox
            id="text"
            className="border-green-500"
            disabled={!notfiyEnabled}
            onClick={() => setTextEnabled(!textEnabled)}
            checked={textEnabled}
          />
          <div
            className="flex w-full justify-between gap-1.5 leading-none"
            style={{
              opacity: notfiyEnabled ? 1 : 0.5,
            }}
          >
            <label
              htmlFor="text"
              className="text-sm font-medium leading-none text-green-500 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Send me text updates
            </label>
            {notfiyEnabled ? (
              <Input
                disabled={!textEnabled}
                value={text}
                onChange={(e) => setText(formatPhoneNumber(e.target.value))}
                className="mr-4 h-4 w-[180px] rounded-none text-black"
              />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notify;
