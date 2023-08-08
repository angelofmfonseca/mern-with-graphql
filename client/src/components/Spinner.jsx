const Spinner = () => {
  return (
    <div className='d-flex justify-content-center'>
      <div className='spinner-border text-secondary' role='status'>
        <span className='visually-hidden sr-only'>Loading...</span>
      </div>
    </div>
  );
};

export default Spinner;
