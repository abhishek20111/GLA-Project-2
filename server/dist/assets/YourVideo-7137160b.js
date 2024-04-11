import{ag as o,ah as e,ao as j,as as b,ak as h,aj as p}from"./index-b86e62c6.js";const y=({videoUrl:r,isPlaying:n})=>{const l=o.useRef(null);return o.useEffect(()=>{n?l.current.play():l.current.pause()},[n]),e.jsx("div",{className:"p-5",children:e.jsx("div",{style:{position:"relative",paddingTop:"56.25%"},children:e.jsx("video",{ref:l,src:r,style:{border:"none",position:"absolute",top:0,height:"100%",width:"100%"},controls:!0})})})},w=({syllabus:r,videoUrl:n,onAccordionClick:l})=>{const[t,a]=o.useState(!1),d=()=>{a(!t),l(n)};return e.jsx("div",{className:"border-b border-gray-200",children:e.jsxs("button",{className:`flex items-center justify-between w-full py-4 px-6 bg-white hover:bg-gray-100 focus:outline-none transition-all duration-300 ease-in-out ${t?"rounded-t-lg":"rounded-lg"}`,onClick:d,children:[e.jsx("h2",{className:"text-lg font-medium text-gray-800",children:r}),e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",className:`h-6 w-6 transform ${t?"rotate-180":"rotate-0"}`,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M19 9l-7 7-7-7"})})]})})},v=({selectedSyllabus:r,selectedVideoUrl:n})=>{const[l,t]=o.useState(""),[a,d]=o.useState(!1),m=i=>{t(i),d(!0)};return e.jsxs("div",{className:"flex flex-col bg-gray-100 rounded-md md:rounded-3xl",children:[e.jsx("div",{className:"w-full",children:e.jsx(y,{videoUrl:l,isPlaying:a})}),e.jsx("div",{className:"w-full",children:e.jsx("div",{className:"px-5 md:h-[300px] h-[200px] overflow-auto",children:n.map((i,x)=>e.jsx(w,{syllabus:r[x],videoUrl:i,onAccordionClick:m},x))})})]})},N=()=>{const[r,n]=o.useState(-1),[l,t]=o.useState(!1),a=s=>p.success(s),d=s=>p.error(s),m=j(s=>s.userData.role),[i,x]=o.useState([]),u=async()=>{try{const s=localStorage.getItem("token"),c=await h.post("/cource/getCourses",{role:m},{headers:{Authorization:`Bearer ${s}`}});console.log(c.data),x(c.data.courses)}catch(s){console.error("Error fetching courses:",s)}},g=async()=>{try{const s=r,c=localStorage.getItem("token"),f=await h.post("/cource/deleteCourse",{id:s},{headers:{Authorization:`Bearer ${c}`}});console.log(f.data.message),a(f.data.message),u()}catch(s){console.error("Error fetching courses:",s),d("Something went wrong...")}};return o.useEffect(()=>{u()},[]),e.jsxs("div",{className:"p-5 bg-gradient-to-r from-blue-100 to-blue-100 via-blue-200",children:[e.jsx("h1",{className:"text-2xl font-bold mb-4 mx-4",children:"Your Courses"}),i.map((s,c)=>e.jsx(b,{children:e.jsxs("div",{className:"outline-double md:m-5 flex flex-wrap md:flex-nowrap p-2 bg-gradient-to-r from-blue-100 to-blue-500",children:[e.jsxs("div",{className:"w-full h-full my-1",children:[e.jsx("div",{className:"mb-10 px-4  border-black rounded-md w-[95%] text-3xl md:text-4xl font-semibold",children:e.jsx("h2",{className:" w-fit py-2 rounded-md  text-sky-700",children:s.title})}),e.jsxs("div",{className:" my-10 flex-col flex justify-center px-4  text-2xl md:w-[75%] md:text-4xl font-semibold",children:[e.jsx("p",{className:"font-thin md:text-3xl",children:"Course Description:"}),e.jsx("p",{className:"md:text-xl px-5 md:py-2 py-1 font-normal outline-dashed outline-1 rounded-xl mt-3 max-h-[300px] overflow-auto",children:s.description})]}),e.jsxs("div",{className:"my-10 flex-col flex justify-center px-4 text-2xl md:w-[75%] md:text-4xl font-semibold",children:[e.jsx("p",{className:"italic md:text-3xl font-thin",children:"Extra Info:"}),e.jsx("p",{className:"italic text-xl rounded-xl outline-dashed outline-1 p-3 font-thin max-h-[100px] overflow-auto",children:s.extraDescription})]})]}),e.jsxs("div",{className:"w-full my-1 bg-white md:rounded-xl rounded-md",children:[e.jsx("div",{className:"flex md:justify-end justify-start p-1",children:e.jsxs("button",{onClick:()=>{t(!0),n(s._id),console.log(r)},className:"bottom-1 py-2 px-5 bg-red-600 rounded-lg left-1 md:text-xl text-white",children:[" ","Delete"," "]})}),e.jsx(v,{className:"flex flex-col",selectedSyllabus:s.syllabus,selectedVideoUrl:s.courseUrl})]})]},s._id)})),l===!0&&e.jsxs("div",{className:"fixed inset-0 z-10 overflow-y-auto",children:[e.jsx("div",{className:"fixed inset-0 w-full h-full bg-black opacity-40",onClick:()=>t(!1)}),e.jsx("div",{className:"flex items-center min-h-screen px-4 py-8",children:e.jsx("div",{className:"relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg",children:e.jsx("div",{className:"py-3 sm:flex",children:e.jsxs("div",{className:"mt-2 text-center sm:ml-4 sm:text-left",children:[e.jsx("h4",{className:"text-lg font-medium text-gray-800",children:"Are you sure?"}),e.jsx("p",{className:"mt-2 text-[15px] leading-relaxed text-gray-500",children:"Selecting delete will permanently delete this course. It will not be recoverable. Are you sure?"}),e.jsxs("div",{className:"items-center gap-2 mt-3 sm:flex",children:[e.jsx("button",{className:"w-full mt-2 p-2.5 flex-1 md:text-xl text-white hover:bg-red-800 bg-red-600 rounded-md outline-none ring-offset-2 ring-indigo-600 focus:ring-2",onClick:()=>{t(!1),g()},children:"Delete"}),e.jsx("button",{className:"w-full mt-2 p-2.5 flex-1 md:text-indigo-600 text-xl rounded-md outline-none border-2  border-indigo-600 focus:ring-2",onClick:()=>t(!1),children:"Cancel"})]})]})})})})]})]})},C=N;export{C as default};