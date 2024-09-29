"use client";

import { Avatar, Dropdown, Popover, Space } from "antd";
import Link from "next/link";
import { useContext } from "react";
import { AppContext } from "../../../AppContext";
import { isEmpty } from "lodash";

function Profile() {
  const { getCurrentUser, dispatch } = useContext(AppContext);
  const user = getCurrentUser();

  const items = [
    {
      label: <h4>Logout</h4>,
      key: "logout",
    },
  ];

  return (
    <div>
      {(!user || isEmpty(user)) && <Link href={"/login"}>Login</Link>}
      {user && !isEmpty(user) ? (
        <div>
          <Dropdown
            menu={{
              items,
              onClick: (e) => {
                if (e?.key === "logout") {
                  dispatch({ type: "LOGOUT" });
                }
              },
            }}
            trigger={["click"]}
          >
            <Space>
              <Avatar size="large">
                {`${user?.firstName?.charAt(0)?.toUpperCase() || ""}${
                  user?.lastName?.charAt(0)?.toUpperCase() || ""
                }`}
              </Avatar>
            </Space>
          </Dropdown>
        </div>
      ) : null}
    </div>
  );
}

export default Profile;
