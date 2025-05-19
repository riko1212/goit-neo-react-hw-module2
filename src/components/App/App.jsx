import { useState, useEffect } from "react";
import Description from "../Description/Description";
import Options from "../Options/Options";
import Feedback from "../Feedback/Feedback";
import Notification from "../Notification/Notification";

const App = () => {
  const INITIAL_STATE = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  const [options, setOptions] = useState(() => {
    const savedFeedback = window.localStorage.getItem("saved-feedback");

    if (savedFeedback !== null) {
      return JSON.parse(savedFeedback);
    }

    return INITIAL_STATE;
  });

  useEffect(() => {
    window.localStorage.setItem("saved-feedback", JSON.stringify(options));
  }, [options]);

  const updateFeedback = (feedbackType) => {
    setOptions({
      ...options,
      [feedbackType]: options[feedbackType] + 1,
    });
  };

  const resetFeedback = () => {
    setOptions(INITIAL_STATE);
  };

  const totalFeedback = options.good + options.neutral + options.bad;
  const positiveFeedback = Math.round((options.good / totalFeedback) * 100);
  /* За завданням нам потрібно використати формулу Math.round((good / totalFeedback) * 100)
  Але якщо уважно подивитись відео, то зрозуміло, що там як позитивний фідбек враховується також і neutral.
  Тому залишаю у коментарі другу формулу, щоб не перездавати роботу у цьому разі.
  */
  // const positiveFeedback = Math.round(((options.good + options.neutral) / totalFeedback) * 100);

  return (
    <>
      <Description
        title="Sip Happens Café"
        description="Please leave your feedback about our service by selecting one of the options below."
      />
      <Options
        options={Object.keys(options)}
        handleIncrement={updateFeedback}
        totalFeedback={totalFeedback}
        handleReset={resetFeedback}
      />
      {totalFeedback ? (
        <Feedback
          good={options.good}
          neutral={options.neutral}
          bad={options.bad}
          totalFeedback={totalFeedback}
          positiveFeedback={positiveFeedback}
        />
      ) : (
        <Notification message="No feedback yet" />
      )}
    </>
  );
};

export default App;
