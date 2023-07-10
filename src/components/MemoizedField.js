import React, { useMemo } from "react";
import { Field } from "redux-form";

const MemoizedField = (fieldProps) => {
  const originalComponent = fieldProps.component;

  const MemoizedComponent = useMemo(() => originalComponent, []);

  return <Field {...fieldProps} component={MemoizedComponent} />;
};

export default MemoizedField;
