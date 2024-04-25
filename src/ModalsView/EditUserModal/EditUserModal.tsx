import { Button, ButtonColorByType } from "@/components/Button";
import { TextField } from "@/components/TextField";
import { useModalContext } from "@/context/ModalContext";
import { useSession } from "@/context/SessionContext";
import { useClickOutside } from "@/hooks/useClickOutside";
import Image from "next/image";
import { ChangeEvent, useRef, useState } from "react";

export const EditUserModal = () => {
  const { handleCloseModal } = useModalContext();
  const { user } = useSession();
  const [nickname, setNickname] = useState(user?.nickname);
  const [userAvatar, setUserAvatar] = useState(user?.avatarUrl || "");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const editUserRef = useRef(null);

  useClickOutside(editUserRef, () => handleCloseModal());

  const handleUploadImage = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setImageFile(file);
    const reader = new FileReader();

    reader.onloadend = () => {
      setUserAvatar(reader.result as string);
    };

    reader.readAsDataURL(file);
  };

  return (
    <div
      className="w-[500px] p-[20px] rounded-xl"
      style={{ backgroundColor: "#545b5c" }}
      ref={editUserRef}
    >
      <h2
        className="text-center text-[#FFF] font-semibold mb-[20px]"
        style={{ fontSize: 24 }}
      >
        {`Edit ${user?.nickname}`}
      </h2>

      <div className="flex justify-between gap-[30px] mb-[30px]">
        <div className="flex flex-col gap-4 items-center">
          <label>
            <input
              type="file"
              className="hidden"
              onChange={handleUploadImage}
            />

            <div className="relative">
              <Image
                width={100}
                height={100}
                src={userAvatar}
                alt={user?.nickname || ""}
                className="rounded-[50%] cursor-pointer w-[150px] h-[150px]"
              />
              <div className="absolute flex justify-center items-center rounded-[50%] top-0 h-[150px] w-full bg-[#888] bg-opacity-50 hover-opacity cursor-pointer">
                <span className="text-white text-4xl font-bold">+</span>
              </div>
            </div>
          </label>

          <TextField
            type="text"
            value={nickname}
            onChange={({ target }) => setNickname(target.value)}
            className="[&>input]:rounded-[30px]"
          />
        </div>

        <div className="flex flex-col gap-[15px]">
          <TextField title="Old Password" />
          <TextField title="New Password" />
          <Button buttonType={ButtonColorByType.ACTIVE} className="mx-auto">
            Change
          </Button>
        </div>
      </div>

      <div className="flex gap-4 justify-center">
        <Button
          buttonType={ButtonColorByType.DELETE}
          onClick={handleCloseModal}
        >
          Cancel
        </Button>
        <Button>Save</Button>
      </div>
    </div>
  );
};
