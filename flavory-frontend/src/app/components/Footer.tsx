/* eslint-disable @next/next/no-img-element */

export default function Footer() {
  return (
    <>
      <footer className="relative w-full bg-beige bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/pattern-new.png')" }}>
        <div className='flex justify-center py-12 sm:py-16 min-h-[400px]'>
          <div className="flex flex-col justify-center lg:max-w-[30%]">
            <img src="/logo.svg" alt="Flavory Logo" className="h-20 my-6" />
            <p className="text-center font-raleway text-[17px] font-normal text-[#595959] mx-[5%] lg:mx-0">
              Theme especially made for cooking experts, novices & all who enjoy sharing their recipes.
            </p>
            <ul className="relative flex justify-center gap-8 leading-none italic text-[17px] font-serif cursor-pointer my-6">
              <li className="relative after:content-[''] after:absolute after:top-1/2 after:translate-y-[-50%] after:right-[-19px] after:w-[8px] after:h-[1px] after:bg-black last:after:hidden">
                  <a href="#" className="hover:text-primary">fb</a>
              </li>
              <li className="relative after:content-[''] after:absolute after:top-1/2 after:translate-y-[-50%] after:right-[-19px] after:w-[8px] after:h-[1px] after:bg-black last:after:hidden">
                  <a href="#" className="hover:text-primary">tw</a>
              </li>
              <li className="relative after:content-[''] after:absolute after:top-1/2 after:translate-y-[-50%] after:right-[-19px] after:w-[8px] after:h-[1px] after:bg-black last:after:hidden">
                  <a href="#" className="hover:text-primary">ln</a>
              </li>
              <li>
                  <a href="#" className="hover:text-primary">p</a>
              </li>
            </ul>
            <div className="flex justify-center items-center w-full lg:mx-0">
              <form className="w-[80%]">
                <div className="flex border-b border-grayDark">
                  <input type="email" placeholder="Enter your email address here" className="py-2 w-full text-[15px] placeholder:text-gray focus:placeholder:text-black focus:outline-none cursor-pointer"/>
                  <button type="submit" className="ml-2 p-1 flex items-center justify-center transform transition-transform duration-300 hover:-translate-y-1">
                      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24.007px" height="23.361px" viewBox="0 0 24.007 23.361" enableBackground="new 0 0 24.007 23.361">
                          <g><polygon fill="#E35640" points="0.244,10.194 12.244,11.194 13.244,23.194 23.338,0.267 23.244,0.194"/></g>
                      </svg>
                  </button>
                </div>
                <span className="text-[13px] italic mt-1.25 items-start text-[#919191]">*Be informed about the latest recipes & workshops.</span>
              </form>
            </div>
          </div>
          
        </div>

        <hr className="my-4 border-gray-200" />
        <div className="mx-12 pb-4 text-xs flex flex-col sm:flex-row items-center justify-center sm:justify-between font-raleway">
          <div className="flex items-center">
            © {new Date().getFullYear()} Flavory™.
          </div>
          <div>Fabriqué à la main & fait avec ❤️</div>
        </div>
      </footer>
    </>
  );
}