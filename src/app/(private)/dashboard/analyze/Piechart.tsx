"use client";

import * as React from "react";
import { Pie, PieChart, Label, Legend } from "recharts";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {} satisfies ChartConfig;

type ChartDataItem = {
  [key: string]: string | number | undefined;
  visitors: number;
  fill?: string;
};

interface PieChartComponentProps {
  chartData: ChartDataItem[];
  dataKeyName: string;
  title: string;
  footerText: string;
}

export default function PieChartComponent({
  chartData,
  dataKeyName,
  title,
  footerText,
}: PieChartComponentProps) {
  const totalVisitors = chartData.reduce((acc, curr) => acc + curr.visitors, 0);
  const hasData = chartData.length > 0;

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>{title}</CardTitle>
      </CardHeader>

      <CardContent className="flex-1 pb-0">
        {hasData ? (
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[300px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={chartData}
                dataKey="visitors"
                nameKey={dataKeyName}
                innerRadius={60}
                strokeWidth={5}
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-3xl font-bold"
                          >
                            {totalVisitors.toLocaleString()}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            Visitors
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </Pie>
              <Legend
                layout="horizontal"
                verticalAlign="bottom"
                align="center"
                iconType="circle"
              />
            </PieChart>
          </ChartContainer>
        ) : (
          <div className="flex h-48 flex-col items-center justify-center text-center text-muted-foreground">
            <p className="text-lg font-medium">No data to display</p>
            <p className="text-sm">We couldn’t find any visit history.</p>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex-col gap-2 text-sm">
        {hasData ? (
          <div className="leading-none text-muted-foreground">
            {footerText}
          </div>
        ) : (
          <div className="text-muted-foreground">No visitors yet</div>
        )}
      </CardFooter>
    </Card>
  );
}
