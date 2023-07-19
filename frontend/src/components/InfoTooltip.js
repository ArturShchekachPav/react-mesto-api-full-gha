const InfoTooltip = ({status, message}) => {
  return (
    <div className="info-tooltip">
      <div
        className={`info-tooltip__status ${status ?
          'info-tooltip__status_success' :
          'info-tooltip__status_fail'}`}
      ></div>
      <h2 className="info-tooltip__title">{message}</h2>
    </div>
  );
};

export default InfoTooltip;
