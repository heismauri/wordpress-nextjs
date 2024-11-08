import MainContainer from '@/components/MainContainer';

const Loading = () => {
  return (
    <MainContainer>
      <div
        className="w-16 h-16 absolute inset-1/2 transform -translate-x-1/2 -translate-y-1/2 -z-10"
        role="status"
      >
        <span className="sr-only">Loading...</span>
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="stroke-sky-600">
          <style>
            {`
              .spinner_V8m1{transform-origin:center;animation:spinner_zKoa 2s linear infinite}
              .spinner_V8m1 circle{stroke-linecap:round;animation:spinner_YpZS 1.5s ease-in-out infinite}
              @keyframes spinner_zKoa{
                100%{transform:rotate(360deg)}
              }
              @keyframes spinner_YpZS{
                0%{stroke-dasharray:0 150;stroke-dashoffset:0}
                47.5%{stroke-dasharray:42 150;stroke-dashoffset:-16}
                95%,100%{stroke-dasharray:42 150;stroke-dashoffset:-59}
              }
            `}
          </style>
          <g className="spinner_V8m1">
            <circle cx="12" cy="12" r="9.5" fill="none" strokeWidth="1" />
          </g>
        </svg>
      </div>
    </MainContainer>
  );
};

export default Loading;
