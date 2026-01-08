import React, { useEffect, useState } from "react";

type AnyComp = any;

export function ChartContainerAsync(props: any) {
  const [mod, setMod] = useState<any>(null);

  useEffect(() => {
    let mounted = true;
    import("./chart").then((m) => {
      if (mounted) setMod(m);
    });
    return () => {
      mounted = false;
    };
  }, []);

  if (!mod) return null;

  const Comp: AnyComp = mod.ChartContainer;
  return <Comp {...props}>{props.children}</Comp>;
}

export function ChartTooltipAsync(props: any) {
  const [mod, setMod] = useState<any>(null);

  useEffect(() => {
    let mounted = true;
    import("./chart").then((m) => {
      if (mounted) setMod(m);
    });
    return () => {
      mounted = false;
    };
  }, []);

  if (!mod) return null;

  const Comp: AnyComp = mod.ChartTooltipContent || mod.ChartTooltip;
  return <Comp {...props} />;
}

export default ChartContainerAsync;
