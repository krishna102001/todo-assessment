const Footer = () => {
  return (
    <div className='bg-gray-600 fixed left-0 bottom-0 w-full'>
      <h3 className='text-white text-xl text-center p-5 font-light'>
        COPYRIGHTS IS RESERVED BY{" "}
        <strong>
          <a
            href='https://www.github.com/krishna102001'
            className='text-orange-500 font-semibold border-b-2 border-indigo-500'
          >
            KRISHNA
          </a>
        </strong>{" "}
        {new Date().getFullYear()}
      </h3>
    </div>
  );
};

export default Footer;
