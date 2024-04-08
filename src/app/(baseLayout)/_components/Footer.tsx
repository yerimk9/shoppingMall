import React from "react";
import Image from "next/image";
import {
  IconAmeriCanExpress,
  IconDinersClub,
  IconDiscover,
  IconMasterCard,
  IconPayPal,
  IconVisa,
} from "../../../../public/svgs";

const cardList = [
  IconVisa,
  IconMasterCard,
  IconAmeriCanExpress,
  IconPayPal,
  IconDinersClub,
  IconDiscover,
];

function Footer() {
  return (
    <div className="flex flex-col gap-4 items-center p-10 border-t-2 bg-white dark:bg-slate-800 dark:text-white">
      <ul className="flex gap-2">
        {cardList.map((card, idx) => (
          <li key={idx}>
            <Image
              src={card}
              alt={card}
              style={{
                width: "100%",
                height: "auto",
              }}
            />
          </li>
        ))}
      </ul>
      <div>
        <p className="italic text-sm">Copyright © 2024 ShoppingMall</p>
      </div>
    </div>
  );
}

export default Footer;
