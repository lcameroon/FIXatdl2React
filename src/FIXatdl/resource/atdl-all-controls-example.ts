export const sampleAllControls = `<?xml version="1.0" encoding="utf-8" standalone="yes"?>
<Strategies xmlns:lay="http://www.fixprotocol.org/FIXatdl-1-1/Layout" xmlns:val="http://www.fixprotocol.org/FIXatdl-1-1/Validation" xmlns:flow="http://www.fixprotocol.org/FIXatdl-1-1/Flow" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" strategyIdentifierTag="8000" versionIdentifierTag="8001" changeStrategyOnCxlRpl="true" xmlns="http://www.fixprotocol.org/FIXatdl-1-1/Core" xsi:schemaLocation="http://www.fixprotocol.org/FIXatdl-1-1/Core Schema/fixatdl-core-1-1.xsd">
	<Strategy name="ALL_CONTROLS_FILLED" uiRep="All Controls Filled" wireValue="ALL" providerID="CT_BROKER1" version="1.0">
		<Regions>
			<Region name="TheAmericas" inclusion="Include"/>
			<Region name="AsiaPacificJapan" inclusion="Include"/>
			<Region name="EuropeMiddleEastAfrica" inclusion="Include"/>
		</Regions>
		<Parameter xsi:type="UTCTimeOnly_t" name="UTCTimeOnlyParam" fixTag="8002" use="optional" mutableOnCxlRpl="true" revertOnCxlRpl="false"/>
		<Parameter xsi:type="MultipleCharValue_t" name="MultipleCharValueParam" fixTag="8003" use="optional" mutableOnCxlRpl="false" revertOnCxlRpl="true">
			<EnumPair wireValue="X" enumID="MCV_X"/>
			<EnumPair wireValue="Y" enumID="MCV_Y"/>
			<EnumPair wireValue="Z" enumID="MCV_Z"/>
		</Parameter>
		<Parameter xsi:type="Float_t" name="FloatParam" fixTag="8004" use="optional" precision="2" mutableOnCxlRpl="false" revertOnCxlRpl="true"/>
		<Parameter xsi:type="Char_t" name="DropDownListParam" fixTag="8005" use="optional" mutableOnCxlRpl="false" revertOnCxlRpl="true">
			<EnumPair wireValue="1" enumID="DropDownListParam_1"/>
			<EnumPair wireValue="2" enumID="DropDownListParam_2"/>
			<EnumPair wireValue="3" enumID="DropDownListParam_3"/>
		</Parameter>
		<Parameter xsi:type="String_t" name="LanguageParam" fixTag="8006" use="optional" mutableOnCxlRpl="false" revertOnCxlRpl="true">
			<EnumPair wireValue="EN" enumID="Language_EN"/>
			<EnumPair wireValue="BS" enumID="Language_BS"/>
			<EnumPair wireValue="CO" enumID="Language_CO"/>
		</Parameter>
		<Parameter xsi:type="MultipleStringValue_t" name="MultipleStringValueParam" fixTag="8007" use="optional" mutableOnCxlRpl="false" revertOnCxlRpl="true">
			<EnumPair wireValue="ABC" enumID="MSVP_ABC"/>
			<EnumPair wireValue="DEF" enumID="MSVP_DEF"/>
			<EnumPair wireValue="GHI" enumID="MSVP_GHI"/>
		</Parameter>
		<Parameter xsi:type="Currency_t" name="CurrencyParam" fixTag="8008" use="optional" mutableOnCxlRpl="false" revertOnCxlRpl="true">
			<EnumPair wireValue="USD" enumID="CCY_USD"/>
			<EnumPair wireValue="GBP" enumID="CCY_GBP"/>
		</Parameter>
		<Parameter xsi:type="TagNum_t" name="TagNumParam" fixTag="8009" use="optional" mutableOnCxlRpl="false" revertOnCxlRpl="true">
			<EnumPair wireValue="1000" enumID="SSL_1000"/>
			<EnumPair wireValue="1001" enumID="SSL_1001"/>
			<EnumPair wireValue="1002" enumID="SSL_1002"/>
			<EnumPair wireValue="1003" enumID="SSL_1003"/>
		</Parameter>
		<Parameter xsi:type="Int_t" name="IntParam" fixTag="8010" use="optional" mutableOnCxlRpl="false" revertOnCxlRpl="true"/>
		<Parameter xsi:type="Char_t" name="CharParam" fixTag="8011" use="optional" mutableOnCxlRpl="false" revertOnCxlRpl="true">
			<EnumPair wireValue="L" enumID="SLDR_L"/>
			<EnumPair wireValue="M" enumID="SLDR_M"/>
			<EnumPair wireValue="H" enumID="SLDR_H"/>
		</Parameter>
		<Parameter xsi:type="Percentage_t" name="PercentageParam" fixTag="8012" use="optional" mutableOnCxlRpl="false" revertOnCxlRpl="true"/>
		<lay:StrategyLayout>
			<lay:StrategyPanel orientation="HORIZONTAL" border="Line" collapsible="false" title="Required parameters" collapsed="false">
				<lay:StrategyPanel orientation="VERTICAL" border="None" collapsed="false" collapsible="false">
					<lay:Control xsi:type="lay:Clock_t" ID="c_Clock" parameterRef="UTCTimeOnlyParam" tooltip="c_Clock tooltip" label="Clock__t:" initValue="09:55:00"/>
					<lay:Control xsi:type="lay:CheckBoxList_t" ID="c_CheckBoxList" initValue="MCV_X MCV_Y" parameterRef="MultipleCharValueParam" tooltip="c_CheckBoxList tooltip" label="CheckBoxList__t:" orientation="HORIZONTAL">
						<lay:ListItem enumID="MCV_X" uiRep="Option X"/>
						<lay:ListItem enumID="MCV_Y" uiRep="Option Y"/>
						<lay:ListItem enumID="MCV_Z" uiRep="Option Z"/>
					</lay:Control>
					<lay:Control xsi:type="lay:DoubleSpinner_t" ID="c_DoubleSpinner" parameterRef="FloatParam" initValue="100.1" tooltip="c_DoubleSpinner tooltip" label="DoubleSpinner__t:" innerIncrement="10" outerIncrement="1"/>
					<lay:Control xsi:type="lay:DropDownList_t" ID="c_HandlInst" parameterRef="DropDownListParam" initValue="DropDownListParam_3" label="DropDownList__t:" tooltip="c_DropDownListParam tooltip">
						<lay:ListItem enumID="DropDownListParam_1" uiRep="Automated-private"/>
						<lay:ListItem enumID="DropDownListParam_2" uiRep="Automated-public"/>
						<lay:ListItem enumID="DropDownListParam_3" uiRep="Manual"/>
					</lay:Control>
					<lay:Control xsi:type="lay:EditableDropDownList_t" ID="c_EditableDropDownList" tooltip="c_EditableDropDownList tooltip" initValue="Language_EN" parameterRef="LanguageParam" label="EditableDropDownList__t:">
						<lay:ListItem enumID="Language_EN" uiRep="English"/>
						<lay:ListItem enumID="Language_BS" uiRep="Bosnian"/>
						<lay:ListItem enumID="Language_CO" uiRep="Corsican"/>
					</lay:Control>
					<lay:Control xsi:type="lay:MultiSelectList_t" ID="c_MultiSelectList" initValue="MSVP_DEF" parameterRef="MultipleStringValueParam" tooltip="c_MultiSelectList tooltip" label="MultiSelectList__t:">
						<lay:ListItem enumID="MSVP_ABC" uiRep="ABC Option"/>
						<lay:ListItem enumID="MSVP_DEF" uiRep="DEF Option"/>
						<lay:ListItem enumID="MSVP_GHI" uiRep="GHI Option"/>
					</lay:Control>
					<lay:Control xsi:type="lay:RadioButtonList_t" ID="c_RadioButtonList" initValue="CCY_GBP" parameterRef="CurrencyParam" tooltip="c_RadioButtonList tooltip" label="RadioButtonList__t:" orientation="HORIZONTAL">
						<lay:ListItem enumID="CCY_USD" uiRep="USD"/>
						<lay:ListItem enumID="CCY_GBP" uiRep="GBP"/>
					</lay:Control>
					<lay:Control xsi:type="lay:SingleSelectList_t" ID="c_SingleSelectList" initValue="SSL_1001" parameterRef="TagNumParam" tooltip="c_SingleSelectList tooltip" label="SingleSelectList__t:">
						<lay:ListItem enumID="SSL_1000" uiRep="Tag 1000"/>
						<lay:ListItem enumID="SSL_1001" uiRep="Tag 1001"/>
						<lay:ListItem enumID="SSL_1002" uiRep="Tag 1002"/>
						<lay:ListItem enumID="SSL_1003" uiRep="Tag 1003"/>
					</lay:Control>
					<lay:Control xsi:type="lay:SingleSpinner_t" ID="c_SingleSpinner" initValue="87654" parameterRef="IntParam" tooltip="c_SingleSpinner tooltip" label="SingleSpinner__t:" increment="100"/>
					<lay:Control xsi:type="lay:Slider_t" ID="c_Slider" parameterRef="CharParam" initValue="SLDR_H" tooltip="c_Slider tooltip" label="Slider__t:">
						<lay:ListItem enumID="SLDR_L" uiRep="Low"/>
						<lay:ListItem enumID="SLDR_M" uiRep="Medium"/>
						<lay:ListItem enumID="SLDR_H" uiRep="High"/>
					</lay:Control>
					<lay:Control xsi:type="lay:TextField_t" ID="c_TextField" parameterRef="PercentageParam" initPolicy="UseFixField" initFixField="FIX_Text" initValue="25" tooltip="c_TextField tooltip" label="TextField__t:"/>
				</lay:StrategyPanel>
			</lay:StrategyPanel>
		</lay:StrategyLayout>
	</Strategy>
	<Strategy name="ALL_CONTROLS_EMPTY" uiRep="All Controls Empty" wireValue="ALL" providerID="CT_BROKER1" version="1.0">
		<Regions>
			<Region name="TheAmericas" inclusion="Include"/>
			<Region name="AsiaPacificJapan" inclusion="Include"/>
			<Region name="EuropeMiddleEastAfrica" inclusion="Include"/>
		</Regions>
		<Parameter xsi:type="UTCTimeOnly_t" name="UTCTimeOnlyParam" fixTag="8002" use="required" mutableOnCxlRpl="true" revertOnCxlRpl="false"/>
		<Parameter xsi:type="MultipleCharValue_t" name="MultipleCharValueParam" fixTag="8003" use="optional" mutableOnCxlRpl="true" revertOnCxlRpl="false">
			<EnumPair wireValue="X" enumID="MCV_X"/>
			<EnumPair wireValue="Y" enumID="MCV_Y"/>
			<EnumPair wireValue="Z" enumID="MCV_Z"/>
		</Parameter>
		<Parameter xsi:type="Float_t" name="FloatParam" fixTag="8004" use="optional" precision="2" mutableOnCxlRpl="true" revertOnCxlRpl="false"/>
		<Parameter xsi:type="Char_t" name="DropDownListParam" fixTag="8005" use="optional" mutableOnCxlRpl="true" revertOnCxlRpl="false">
			<EnumPair wireValue="1" enumID="DropDownListParam_1"/>
			<EnumPair wireValue="2" enumID="DropDownListParam_2"/>
			<EnumPair wireValue="3" enumID="DropDownListParam_3"/>
		</Parameter>
		<Parameter xsi:type="String_t" name="LanguageParam" fixTag="8006" use="optional" mutableOnCxlRpl="true" revertOnCxlRpl="false">
			<EnumPair wireValue="EN" enumID="Language_EN"/>
			<EnumPair wireValue="BS" enumID="Language_BS"/>
			<EnumPair wireValue="CO" enumID="Language_CO"/>
		</Parameter>
		<Parameter xsi:type="MultipleStringValue_t" name="MultipleStringValueParam" fixTag="8007" use="optional" mutableOnCxlRpl="true" revertOnCxlRpl="false">
			<EnumPair wireValue="ABC" enumID="MSVP_ABC"/>
			<EnumPair wireValue="DEF" enumID="MSVP_DEF"/>
			<EnumPair wireValue="GHI" enumID="MSVP_GHI"/>
		</Parameter>
		<Parameter xsi:type="Currency_t" name="CurrencyParam" fixTag="8008" use="optional" mutableOnCxlRpl="true" revertOnCxlRpl="false">
			<EnumPair wireValue="USD" enumID="CCY_USD"/>
			<EnumPair wireValue="GBP" enumID="CCY_GBP"/>
		</Parameter>
		<Parameter xsi:type="TagNum_t" name="TagNumParam" fixTag="8009" use="optional" mutableOnCxlRpl="true" revertOnCxlRpl="false">
			<EnumPair wireValue="1000" enumID="SSL_1000"/>
			<EnumPair wireValue="1001" enumID="SSL_1001"/>
			<EnumPair wireValue="1002" enumID="SSL_1002"/>
			<EnumPair wireValue="1003" enumID="SSL_1003"/>
		</Parameter>
		<Parameter xsi:type="Int_t" name="IntParam" fixTag="8010" use="optional" mutableOnCxlRpl="true" revertOnCxlRpl="false"/>
		<Parameter xsi:type="Char_t" name="CharParam" fixTag="8011" use="optional" mutableOnCxlRpl="true" revertOnCxlRpl="false">
			<EnumPair wireValue="L" enumID="SLDR_L"/>
			<EnumPair wireValue="M" enumID="SLDR_M"/>
			<EnumPair wireValue="H" enumID="SLDR_H"/>
		</Parameter>
		<Parameter xsi:type="Percentage_t" name="PercentageParam" fixTag="8012" use="optional" mutableOnCxlRpl="true" revertOnCxlRpl="false"/>
		<lay:StrategyLayout>
			<lay:StrategyPanel orientation="HORIZONTAL" border="Line" collapsible="false" title="Required parameters" collapsed="false">
				<lay:StrategyPanel orientation="VERTICAL" border="None" collapsed="false" collapsible="false">
					<lay:Control xsi:type="lay:Clock_t" ID="c_Clock" parameterRef="UTCTimeOnlyParam" tooltip="c_Clock tooltip" label="Clock__t:"/>
					<lay:Control xsi:type="lay:CheckBoxList_t" ID="c_CheckBoxList" parameterRef="MultipleCharValueParam" tooltip="c_CheckBoxList tooltip" label="CheckBoxList__t:" orientation="HORIZONTAL">
						<lay:ListItem enumID="MCV_X" uiRep="Option X"/>
						<lay:ListItem enumID="MCV_Y" uiRep="Option Y"/>
						<lay:ListItem enumID="MCV_Z" uiRep="Option Z"/>
					</lay:Control>
					<lay:Control xsi:type="lay:DoubleSpinner_t" ID="c_DoubleSpinner" parameterRef="FloatParam" tooltip="c_DoubleSpinner tooltip" label="DoubleSpinner__t:" innerIncrement="10" outerIncrement="1"/>
					<lay:Control xsi:type="lay:DropDownList_t" ID="c_HandlInst" parameterRef="DropDownListParam" label="DropDownList__t:" tooltip="c_DropDownListParam tooltip">
						<lay:ListItem enumID="DropDownListParam_1" uiRep="Automated-private"/>
						<lay:ListItem enumID="DropDownListParam_2" uiRep="Automated-public"/>
						<lay:ListItem enumID="DropDownListParam_3" uiRep="Manual"/>
					</lay:Control>
					<lay:Control xsi:type="lay:EditableDropDownList_t" ID="c_EditableDropDownList" tooltip="c_EditableDropDownList tooltip" parameterRef="LanguageParam" label="EditableDropDownList__t:">
						<lay:ListItem enumID="Language_EN" uiRep="English"/>
						<lay:ListItem enumID="Language_BS" uiRep="Bosnian"/>
						<lay:ListItem enumID="Language_CO" uiRep="Corsican"/>
					</lay:Control>
					<lay:Control xsi:type="lay:MultiSelectList_t" ID="c_MultiSelectList" parameterRef="MultipleStringValueParam" tooltip="c_MultiSelectList tooltip" label="MultiSelectList__t:">
						<lay:ListItem enumID="MSVP_ABC" uiRep="ABC Option"/>
						<lay:ListItem enumID="MSVP_DEF" uiRep="DEF Option"/>
						<lay:ListItem enumID="MSVP_GHI" uiRep="GHI Option"/>
					</lay:Control>
					<lay:Control xsi:type="lay:RadioButtonList_t" ID="c_RadioButtonList" parameterRef="CurrencyParam" tooltip="c_RadioButtonList tooltip" label="RadioButtonList__t:" orientation="HORIZONTAL">
						<lay:ListItem enumID="CCY_USD" uiRep="USD"/>
						<lay:ListItem enumID="CCY_GBP" uiRep="GBP"/>
					</lay:Control>
					<lay:Control xsi:type="lay:SingleSelectList_t" ID="c_SingleSelectList" parameterRef="TagNumParam" tooltip="c_SingleSelectList tooltip" label="SingleSelectList__t:">
						<lay:ListItem enumID="SSL_1000" uiRep="Tag 1000"/>
						<lay:ListItem enumID="SSL_1001" uiRep="Tag 1001"/>
						<lay:ListItem enumID="SSL_1002" uiRep="Tag 1002"/>
						<lay:ListItem enumID="SSL_1003" uiRep="Tag 1003"/>
					</lay:Control>
					<lay:Control xsi:type="lay:SingleSpinner_t" ID="c_SingleSpinner" parameterRef="IntParam" tooltip="c_SingleSpinner tooltip" label="SingleSpinner__t:" increment="100"/>
					<lay:Control xsi:type="lay:Slider_t" ID="c_Slider" parameterRef="CharParam" tooltip="c_Slider tooltip" label="Slider__t:">
						<lay:ListItem enumID="SLDR_L" uiRep="Low"/>
						<lay:ListItem enumID="SLDR_M" uiRep="Medium"/>
						<lay:ListItem enumID="SLDR_H" uiRep="High"/>
					</lay:Control>
					<lay:Control xsi:type="lay:TextField_t" ID="c_TextField" parameterRef="PercentageParam" tooltip="c_TextField tooltip" label="TextField__t:"/>
				</lay:StrategyPanel>
			</lay:StrategyPanel>
		</lay:StrategyLayout>
	</Strategy>
	<Strategy fixMsgType="D" name="UPDATE_FIX_VALUES_EXAMPLE" uiRep="Update Values Example" version="1.0" wireValue="UPDATE">
		<Regions>
			<Region name="TheAmericas" inclusion="Include"/>
			<Region name="AsiaPacificJapan" inclusion="Include"/>
			<Region name="EuropeMiddleEastAfrica" inclusion="Include"/>
		</Regions>
		<Parameter fixTag="8002" name="MinCrossQty" use="required" xsi:type="Qty_t"/>
		<lay:StrategyLayout>
			<lay:StrategyPanel collapsible="false" orientation="HORIZONTAL">
				<lay:StrategyPanel collapsible="false" orientation="VERTICAL">
					<lay:Control ID="c_MinCrossQty" increment="1" label="Min Cross Qty" parameterRef="MinCrossQty" xsi:type="lay:SingleSpinner_t"/>
					<lay:Control ID="c_Label" label="Min Cross Qty must not exceed the order quantity (tag 38)." xsi:type="lay:Label_t"/>
				</lay:StrategyPanel>
			</lay:StrategyPanel>
		</lay:StrategyLayout>
		<val:StrategyEdit errorMessage="Min Cross Qty cannot exceed Order Qty.">
			<val:Edit logicOperator="OR">
				<val:Edit field="MinCrossQty" operator="NX"/>
				<val:Edit field="FIX_OrderQty" operator="NX"/>
				<val:Edit field="MinCrossQty" field2="FIX_OrderQty" operator="LE"/>
			</val:Edit>
		</val:StrategyEdit>
	</Strategy>
</Strategies>
`;
