"use client";

import { ChangeEvent, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/GlobalRedux/hooks";
import { Loader } from "@/components/Loader";
import { useDebounce } from "@/hooks/debounce";
import { CloseIcon } from "@/svgComponents/CloseIcon";
import { EditIcon } from "@/svgComponents/EditIcon";
import * as authSlice from "@/GlobalRedux/Features/auth/authSlice";
import * as userSlice from "@/GlobalRedux/Features/user/userSlice";
import { toast } from "react-toastify";

export default function AccountSettings() {
  const dispatch = useAppDispatch();
  const {
    nickname,
    avatarUrl,
    isLoadingUpdateUser,
    error,
    isLoadingChangePassword,
  } = useAppSelector((state) => state.user);
  const { isAvialableNickName, isLoading } = useAppSelector(
    (state) => state.auth
  );
  const [newAvatar, setNewAvatar] = useState<string | null>(null);
  const [newNickname, setNewNickname] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const debauncedNickname = useDebounce(newNickname, 500);

  const handleUploadImage = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setImageFile(file);
    const reader = new FileReader();

    reader.onloadend = () => {
      setNewAvatar(reader.result as string);
    };

    reader.readAsDataURL(file);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setPasswords((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdatePassword = async () => {
    const newPassword = passwords.newPassword.trim();
    const oldPassword = passwords.oldPassword.trim();
    
    if (!oldPassword || !newPassword) {
      toast.error("Password fields cannot be empty");
      return;
    }

    if (newPassword.length < 6 || newPassword.length > 16) {
      toast.error("New password length must be between 6 and 16 characters");
      return;
    }

    const responce = await dispatch(
      userSlice.changePassword({
        oldPassword,
        newPassword,
      })
    );

    if (responce.payload) {
      toast.success("Password updated successfully");
      setPasswords({ oldPassword: "", newPassword: "" });
    }
  };

  const handleToggleEdit = () => {
    setNewNickname("");
    setIsOpenEdit((prev) => !prev);
  };

  const handleSave = async () => {
    if (imageFile) {
      const formData = new FormData();
      formData.append("image", imageFile);

      const response = await dispatch(userSlice.changeAvatar(formData));

      if (response.payload) {
        toast.success("User avatar updated successfully");
      }
    }

    if (debauncedNickname.trim().length) {
      const response = await dispatch(userSlice.changeNickname(debauncedNickname));

      if (response.payload) {
        toast.success("User nickname updated successfully");
        setIsOpenEdit(false);
      } else {
        toast.error("Unable to update nickname");
      }
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  useEffect(() => {
    if (!debauncedNickname.trim()) return;

    (async () => {
      dispatch(authSlice.checkNickname(debauncedNickname));
    })();
  }, [debauncedNickname, dispatch]);

  if (!nickname || !avatarUrl) {
    return null;
  }

  return (
    <>
      <h1 className="text-center mb-6 font-bold text-4xl">Account Settings</h1>
      <div className="flex flex-col mx-auto justify-between w-[70%] h-[400px] p-4 border-4 border-[#B4B4B8] rounded-lg">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-[20px] relative">
            <div className="absolute top-[120px] left-[120px] rounded-md p-1 transition-all hover:bg-[#B4B4B8] cursor-pointer">
              <label>
                <EditIcon />
                <input
                  className="hidden"
                  type="file"
                  accept="image/png, image/jpeg"
                  name="avatarUrl"
                  onChange={handleUploadImage}
                />
              </label>
            </div>
            <Image
              src={newAvatar || avatarUrl}
              width={150}
              height={150}
              loading="lazy"
              alt={nickname}
              className="rounded-[50%] max-w-[150px] max-h-[150px]"
            />
            {!isOpenEdit ? (
              <div className="flex items-center gap-4 border-b">
                <span className="font-semibold text-xl">{nickname}</span>
                <div
                  className="rounded-md p-1 transition-all hover:bg-[#B4B4B8] cursor-pointer"
                  onClick={handleToggleEdit}
                >
                  <EditIcon />
                </div>
              </div>
            ) : (
              <div>
                <div className="relative flex">
                  <input
                    type="text"
                    placeholder="New Nickname"
                    className="p-2"
                    value={newNickname}
                    onChange={({ target }) => setNewNickname(target.value)}
                  />
                  <div
                    className="absolute right-1 top-1 rounded-md p-1 transition-all hover:bg-[#B4B4B8] cursor-pointer"
                    onClick={handleToggleEdit}
                  >
                    <CloseIcon />
                  </div>
                </div>
                {!isAvialableNickName && newNickname && (
                  <p>Nickname already used</p>
                )}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-4 [&>label]:flex [&>label]:flex-col [&>label]:text-[#B4B4B8] [&>label>input]:p-3 [&>label>input]:text-black [&>label>input]:border [&>label>input]:rounded-xl [&>label>input]:border-color-[#B4B4B8]">
            <label>
              Old Password
              <input
                type="text"
                placeholder="Enter old password"
                name="oldPassword"
                value={passwords.oldPassword}
                onChange={handlePasswordChange}
              />
            </label>
            <label>
              New Password
              <input
                type="text"
                placeholder="Enter new password"
                name="newPassword"
                value={passwords.newPassword}
                onChange={handlePasswordChange}
              />
            </label>
            <button
              className="flex justify-center items-center p-2 text-center bg-[#1976d2] text-white font-semibold rounded-md hover-scale"
              disabled={isLoadingChangePassword}
              onClick={handleUpdatePassword}
            >
              {isLoadingChangePassword ? <Loader /> : "Change Password"}
            </button>
          </div>
        </div>

        <div className="flex justify-center gap-4 [&>button]:p-4 [&>button]:w-[20%] [&>button]:text-center [&>button]:text-white [&>button]:font-bold [&>button]:rounded-md">
          <button className="bg-[#DC004E] hover-scale">
            <Link href="/company">Cancel</Link>
          </button>
          <button
            className="flex items-center justify-center bg-[#1976d2] hover-scale"
            onClick={handleSave}
            disabled={isLoading || (!isAvialableNickName && isOpenEdit)}
          >
            {isLoadingUpdateUser || isLoading ? <Loader /> : "Update"}
          </button>
        </div>
      </div>
    </>
  );
}
