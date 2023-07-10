import React, { useState } from "react";
import "./contact.css";
import SendIcon from "@mui/icons-material/Send";
import { Button } from "@mui/material";
import Header from "../../components/Header/Header";
import useDocumentTitle from "../../hook/useDocumentTitle";
const Contact = () => {
  useDocumentTitle("تماس با ما - بیمه یاران");
  return (
    <div>
      <Header color={"white"} />
      <div className="bg-gradient-to-b from-purple-600 to-indigo-700 h-96 w-full">
        <div className="md:px-20 px-4 py-8"></div>
        <div className="contact-form w-full flex items-center justify-center my-12">
          <div className="absolute top-40 bg-white shadow py-8 lg:px-28 px-8" style={{ borderRadius: "35px" }}>
            <p className="md:text-3xl text-xl font-bold leading-7 text-center text-gray-700">با ما در ارتباط باشید</p>
            <div className="md:flex items-center mt-10">
              <div className="md:w-72 flex flex-col contact-item">
                <label className="text-end leading-none text-gray-800">آدرس ایمیل</label>
                <input tabIndex={0} aria-label="Please input email address" type="name" className="text-end leading-none text-gray-900 p-3  mt-4 bg-gray-100 placeholder-gray-300" placeholder="mail@gmail.com" />
              </div>
              <div className="md:w-72 flex flex-col md:ml-6 md:mt-0 mt-4">
                <label className="text-end leading-none text-gray-800">نام</label>
                <input tabIndex={0} aria-label="Please input name" type="name" className="text-end leading-none text-gray-900 p-3 mt-4 bg-gray-100 placeholder-gray-300" placeholder="محمد ندایی" />
              </div>
            </div>
            <div className="md:flex items-center mt-8">
              <div className="md:w-72 flex flex-col">
                <label className="text-end leading-none text-gray-800">شماره تماس</label>
                <input tabIndex={0} role="input" aria-label="Please input company name" type="name" className="text-end leading-none text-gray-900 p-3 mt-4 bg-gray-100 placeholder-gray-300 " placeholder="+۹۸۹۱۲۳۴۵۶۷۸۹" />
              </div>
              <div className="md:w-72 flex flex-col md:ml-6 md:mt-0 mt-4">
                <label className="text-end leading-none text-gray-800">موضوع</label>
                <input tabIndex={0} aria-label="Please input name" type="name" className="text-end leading-none text-gray-900 p-3 mt-4 bg-gray-100 placeholder-gray-300" placeholder="پشتیبانی" />
              </div>
            </div>
            <div>
              <div className="w-full flex flex-col mt-8">
                <label className="text-end leading-none text-gray-800">متن پیام</label>
                <textarea tabIndex={0} aria-label="leave a message" role="textbox" type="name" className="h-36 text-end leading-none text-gray-900 p-3 mt-4 bg-gray-100 placeholder-gray-300 resize-none" placeholder="..." />
              </div>
            </div>
            <p className="text-end text-xs leading-3 text-gray-600 mt-4">با کلیک بر روی دکمه ی ارسال، با قوانین صندوق پستی بیمه یاران موافقت می کنید</p>
            <div style={{ marginBottom: "45px" }} className="flex items-center justify-center w-full">
              <Button style={{ marginTop: "15px" }} className="m-btn" variant="contained" startIcon={<SendIcon />}>
                ارسال
              </Button>{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
