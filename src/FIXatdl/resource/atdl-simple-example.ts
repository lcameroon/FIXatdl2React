export const sampleFIXatdl = `<Strategies xmlns:lay="http://www.fixprotocol.org/FIXatdl-1-1/Layout">
<Strategy name="Tazer 2" uiRep="Strategy" wireValue="4000" fixMsgType="A">
    <Parameter name="EffectiveTime" xsi:type="UTCTimestamp_t" fixTag="168"/>
    <Parameter name="VolTarget" xsi:type="Percentage_t" fixTag="7641" minValue="0.01" maxValue="0.75"/>
    <lay:StrategyLayout>
        <lay:StrategyPanel>
            <lay:Control xsi:type="lay:Clock_t" ID="StartTimeClock" label="Start Time" parameterRef="EffectiveTime"/>
            <lay:Control xsi:type="lay:Clock_t" ID="StartTimeClock" label="Start Time" parameterRef="EffectiveTime"/>
            <lay:Control xsi:type="lay:Clock_t" ID="StartTimeClock" label="Start Time" parameterRef="EffectiveTime"/>
            <lay:Control xsi:type="lay:Clock_t" ID="StartTimeClock" label="Start Time" parameterRef="EffectiveTime"/>
            <lay:Control xsi:type="lay:Clock_t" ID="StartTimeClock" label="Start Time" parameterRef="EffectiveTime"/>
            <lay:Control xsi:type="lay:Clock_t" ID="StartTimeClock" label="Start Time" parameterRef="EffectiveTime"/>
        </lay:StrategyPanel>
    </lay:StrategyLayout>
</Strategy>
<Strategy name="Tazer" uiRep="Strategy" wireValue="3000" fixMsgType="D">
    <Parameter name="EffectiveTime" xsi:type="UTCTimestamp_t" fixTag="168"/>
    <Parameter name="VolTarget" xsi:type="Percentage_t" fixTag="7641" minValue="0.01" maxValue="0.75"/>
    <lay:StrategyLayout>
        <lay:StrategyPanel>
            <lay:Control xsi:type="lay:Clock_t" ID="StartTimeClock" label="Start Time" parameterRef="EffectiveTime"/>
            <lay:Control xsi:type="lay:SingleSpinner_t" ID="VolSpinner" label="Target (1-75%)" parameterRef="VolTarget"/>
        </lay:StrategyPanel>
        <lay:StrategyPanel>
            <lay:Control xsi:type="lay:Clock_t" ID="StartTimeClock" label="Start Time" parameterRef="EffectiveTime"/>
            <lay:Control xsi:type="lay:SingleSpinner_t" ID="VolSpinner" label="Target (1-75%)" parameterRef="VolTarget"/>
        </lay:StrategyPanel>
    </lay:StrategyLayout>
</Strategy>
</Strategies>`;
