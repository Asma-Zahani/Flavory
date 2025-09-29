/* eslint-disable @next/next/no-img-element */

export default function Footer() {
  return (
    <>
      <footer className="relative w-full bg-beige bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/pattern-new.png')" }}>
        <div className='flex flex-col items-center justify-center py-12 sm:py-20 space-y-6 min-h-[400px]'>
          <div>
            <img src="/logo.svg" alt="Flavory Logo" className="h-20" />
          </div>
          <p className="text-center font-raleway text-lg font-normal text-[#595959] max-w-sm">
            Theme especially made for cooking experts, novices & all who enjoy sharing their recipes.
          </p>
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