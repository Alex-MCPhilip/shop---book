import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { IoBagHandleOutline } from "react-icons/io5";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { backend_url } from "../../server";
import { useDispatch, useSelector } from "react-redux";
import { addTocart, removeFromCart } from "../../redux/actions/cart";
import { toast } from "react-toastify";


const cartData = [
    {
        name:"HarryPoter sách cấm thuật",
        description:"test",
        price:999,
    },
    {
        name:"HarryPoter sách cấm thuật",
        description:"test",
        price:256,
    },
    {
        name:"HarryPoter sách cấm thuật",
        description:"test",
        price:894,
    },
]


const Cart = ({ setOpenCart }) => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const removeFromCartHandler = (data) => {
    dispatch(removeFromCart(data));
  };

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.qty *  item.price,
    0
  );

  const quantityChangeHandler = (data) => {
    dispatch(addTocart(data));
  };

  return (
    // nền ngoài mờ bao bọc
    <div className="fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10">
        {/* nền trắng chứa sản phẩm */}
      <div className="fixed top-0 right-0 h-full w-[80%] 800px:w-[25%] bg-[#f6f6f5] flex flex-col overflow-y-scroll justify-between shadow-sm">
        
        {cart && cart.length === 0 ? (
           <div className="w-full h-screen flex items-center justify-center">
            
            {/* dấu X */}
            <div className="flex w-full justify-end pt-5 pr-5 fixed top-3 right-3">
               <RxCross1 
                size={25}
                className="cursor-pointer"
                onClick={() => setOpenCart(false)}
                />
            </div>
            <h5>Không có sản phẩm nào trong giỏ hàng!</h5>
          </div> 
          ) : ( 
           <> 
            <div>
              <div className="flex w-full justify-end pt-5 pr-5">
                <RxCross1
                  size={25}
                  className="cursor-pointer"
                  onClick={() => setOpenCart(false)}
                />
              </div>
              {/* Item length */}
              <div className={`${styles.noramlFlex} p-4`}>
                <IoBagHandleOutline size={30} />
                <h5 className="pl-2 text-[20px] font-[500]">
                    {cart && cart.length}
                    <span className="pl-1">sản phẩm</span> 
                     {/* 3 items */}
                </h5> 
              </div>

              {/* cart Single Items */}
              <br />
              <div className="w-full border-t">
                {/* {
                    cartData && cartData.map((i,index) =>(
                        <CartSingle key={index} data={i}/>
                    ))
                } */}
                {cart &&
                  cart.map((i, index) => (
                    <CartSingle
                      key={index}
                      data={i}
                      quantityChangeHandler={quantityChangeHandler}
                      removeFromCartHandler={removeFromCartHandler}
                    />
                  ))}
              </div>
            </div>

            <div className="px-5 mb-3">
              {/* checkout buttons */}
              <Link to="/checkout">
                <div
                  className={`h-[45px] flex items-center justify-center w-[100%] bg-[#e44343] rounded-[5px]`}
                >
                  <h1 className="text-[#fff] text-[18px] font-[600]">
                     Thanh toán
                    <span className="p-1">
                        {totalPrice}
                    </span>
                      VNĐ
                  </h1>
                </div>
              </Link>
            </div>

          </>
         )}
      </div>
    </div>
  );
};

const CartSingle = ({ data, quantityChangeHandler, removeFromCartHandler }) => {
  const [value, setValue] = useState(data.qty);

  // const [value, setValue] = useState(1);
  // const totalPrice = data.price * value;
  // const totalPrice = data.discountPrice * value;


  const increment = (data) => {
    if (data.stock < value) {
      toast.error("Product stock limited!");
    } else {
      setValue(value + 1);
      const updateCartData = { ...data, qty: value + 1 };
      quantityChangeHandler(updateCartData);
    }
  };

  const decrement = (data) => {
    setValue(value === 1 ? 1 : value - 1);
    const updateCartData = { ...data, qty: value === 1 ? 1 : value - 1 };
    quantityChangeHandler(updateCartData);
  };

  const totalPrice = data.price * value;


  return (
    <div className="border-b p-4 bg-white">
      
      <div className="w-full flex items-center">
        
        <div>
          <div
            className={`bg-[#e44343] border border-[#e4434373] rounded-full w-[25px] h-[25px] ${styles.noramlFlex} justify-center cursor-pointer`}
            // onClick={() =>  setValue(value + 1)}
            onClick={() => increment(data)}
          >
            <HiPlus size={20} color="#fff" />
          </div>
          <span className="pl-[10px]">
            {/* {value} */}
            {data.qty}
          </span>
          <div
            className="bg-[#a7abb14f] rounded-full w-[25px] h-[25px] flex items-center justify-center cursor-pointer"
            // onClick={() =>  setValue(value === 1 ? 1 : value + 1)} 
            onClick={() => decrement(data)}
          >
            <HiOutlineMinus size={15} color="#7d879c" />
          </div>
        </div>
        
        <img
          // src="https://product.hstatic.net/1000363117/product/b_a-1_tu_i-tr_-d_ng-_-l_m-g__e4f4adc0cade491cab1bf559a56bf77a_medium.jpg"
          src={`${backend_url}${data?.images[0]}`}
          alt=""
          className="w-[130px] h-min ml-2 mr-2 rounded-[5px]"
        />

        <div className="pl-[5px]">
          <h1>{data.name}</h1>
          <h4 className="font-[400] text-[15px] text-[#00000082]">
            {data.price} * {value}
          </h4>
          <h4 className="font-[600] text-[17px] pt-[3px] text-[#d02222] font-Roboto">
            {totalPrice}
            <span className="pl-1">VNĐ</span>
          </h4> 
        </div>
        <RxCross1
          size={30}
          className="cursor-pointer"
          onClick={() => removeFromCartHandler(data)}
        />

      </div>
    </div>
  );
};

export default Cart;