import React from 'react'

const MapsComponent = () => {
  const iframeSrc = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d83998.96777894653!2d2.264634647748965!3d48.85882549217929!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e1f06e2b70f%3A0x40b82c3688c9460!2sParis%2C%20France!5e0!3m2!1sen!2sbd!4v1715410631370!5m2!1sen!2sbd';

  return (
    <div className="aspect-w-16 aspect-h-9">
      <iframe
        src={iframeSrc}
        width="100%"
        height="280px"
        style={{ border: 0, borderRadius: "12px" }}
        allowFullScreen
        loading="lazy"

        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
};

export default MapsComponent;