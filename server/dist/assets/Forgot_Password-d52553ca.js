import{ag as a,ah as e,ak as m,aj as t}from"./index-1e03a33d.js";const g="/assets/forgot-password-7258ef0c.avif";function f(){const[o,l]=a.useState(""),[d,n]=a.useState(!1),c=s=>t.success(s),i=s=>t.error(s),x=async s=>{s.preventDefault();try{const r=await m.post("http://localhost:8080/forgot-password",{email:o});console.log(r.data),c(r.data.message),n(!0)}catch(r){console.log(r),i(r.message)}};return e.jsx("div",{className:"h-[100dvh] w-[100dvw] flex",children:e.jsxs("div",{className:"max-w-sm flex flex-col rounded overflow-hidden m-auto shadow-lg ",children:[e.jsx("img",{className:"w-full",src:g,alt:"forgot User"}),d?e.jsx(e.Fragment,{children:e.jsx("div",{children:e.jsxs("div",{className:"px-6 py-4",children:[e.jsx("div",{className:" flex gap-x-4 items-center",children:e.jsx("div",{className:"font-bold text-xl mb-2",children:"Verification Mail"})}),e.jsxs("p",{className:"text-gray-700 text-base",children:["Verification Code send to your Email Id",e.jsx("br",{}),"Please check it.."]})]})})}):e.jsxs("div",{children:[e.jsxs("div",{className:"px-6 py-4",children:[e.jsx("div",{className:" flex gap-x-4 items-center",children:e.jsx("div",{className:"font-bold text-xl mb-2",children:"Forgot Your Password"})}),e.jsxs("p",{className:"text-gray-700 text-base",children:["Enter Your Email Id to reset your password",e.jsx("input",{type:"text",name:"email",className:" my-2  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",placeholder:"dreamUp@gmail.com",required:!0,onChange:s=>l(s.target.value)})]})]}),e.jsx("div",{className:"w-full flex mb-4 justify-center",children:e.jsx("button",{onClick:s=>x(s),className:"flex  justify-center w-[12rem] text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800",children:"Reset Password"})})]})]})})}export{f as default};
