<map version="1.0.1">
<!-- To view this file, download free mind mapping software FreeMind from http://freemind.sourceforge.net -->
<node CREATED="1283093380553" ID="ID_1723255651" MODIFIED="1486466871692" TEXT="KuhPiDB">
<hook NAME="MapStyle">
<properties SHOW_ICON_FOR_ATTRIBUTES="true" SHOW_NOTE_ICONS="true"/>
<map_styles>
<stylenode LOCALIZED_TEXT="styles.root_node">
<stylenode LOCALIZED_TEXT="styles.predefined" POSITION="right">
<stylenode COLOR="#000000" LOCALIZED_TEXT="default" MAX_WIDTH="600" STYLE="as_parent"/>
<stylenode LOCALIZED_TEXT="defaultstyle.details"/>
<stylenode LOCALIZED_TEXT="defaultstyle.note"/>
<stylenode LOCALIZED_TEXT="defaultstyle.floating">
<cloud/>
</stylenode>
</stylenode>
<stylenode LOCALIZED_TEXT="styles.user-defined" POSITION="right">
<stylenode COLOR="#18898b" LOCALIZED_TEXT="styles.topic" STYLE="fork"/>
<stylenode COLOR="#cc3300" LOCALIZED_TEXT="styles.subtopic" STYLE="fork"/>
<stylenode COLOR="#669900" LOCALIZED_TEXT="styles.subsubtopic"/>
<stylenode LOCALIZED_TEXT="styles.important">
<icon/>
</stylenode>
</stylenode>
<stylenode LOCALIZED_TEXT="styles.AutomaticLayout" POSITION="right">
<stylenode COLOR="#000000" LOCALIZED_TEXT="AutomaticLayout.level.root"/>
<stylenode COLOR="#0033ff" LOCALIZED_TEXT="AutomaticLayout.level,1"/>
<stylenode COLOR="#00b439" LOCALIZED_TEXT="AutomaticLayout.level,2"/>
<stylenode COLOR="#990000" LOCALIZED_TEXT="AutomaticLayout.level,3"/>
<stylenode COLOR="#111111" LOCALIZED_TEXT="AutomaticLayout.level,4"/>
</stylenode>
</stylenode>
</map_styles>
</hook>
<hook NAME="AutomaticEdgeColor"/>
<attribute NAME="version" VALUE="&quot;1.1.0&quot;"/>
<node CREATED="1422977367955" HGAP="30" ID="ID_1556166358" MODIFIED="1486475710495" POSITION="left" TEXT="admin" VSHIFT="30">
<edge COLOR="#7c007c"/>
<cloud COLOR="#f0f0f0"/>
<node CREATED="1422977377081" ID="ID_934351669" MODIFIED="1422977402927" TEXT="version[]"/>
<node CREATED="1422977393986" ID="ID_1640159142" MODIFIED="1422977592960" TEXT="changelog">
<richcontent TYPE="NOTE"><html>
  <head>
    
  </head>
  <body>
    <p>
      Die Namen der Unterdokumente entsprechen Namen von Collections, z.B. "data_packages", oder "analysis_results".
    </p>
  </body>
</html></richcontent>
<node CREATED="1422977412426" ID="ID_20116638" MODIFIED="1422977427989" TEXT="&lt;collection_1&gt;">
<node CREATED="1422977461690" ID="ID_1341664609" MODIFIED="1422977487943" TEXT="last_modification_at">
<icon BUILTIN="calendar"/>
</node>
</node>
<node CREATED="1422977749897" ID="ID_761702717" MODIFIED="1422977752654" TEXT="..."/>
<node CREATED="1422977428666" ID="ID_965634861" MODIFIED="1422977756630" TEXT="&lt;collection_n&gt;">
<node CREATED="1422977470386" ID="ID_998827119" MODIFIED="1422977484879" TEXT="last_modification_at">
<icon BUILTIN="calendar"/>
</node>
</node>
</node>
</node>
<node CREATED="1415639866554" ID="ID_603295218" MODIFIED="1486466888975" POSITION="left" TEXT="data_packages" VSHIFT="-50">
<edge COLOR="#00ff00"/>
<cloud COLOR="#f0f0f0"/>
<node CREATED="1422381338418" ID="ID_1460425486" MODIFIED="1486466824769" TEXT="_id"/>
<node CREATED="1415697214688" ID="ID_1311176257" MODIFIED="1486466925760" STYLE="fork" TEXT="name" VSHIFT="10"/>
<node CREATED="1416598295797" ID="ID_922524070" MODIFIED="1421084268516" TEXT="timestamp">
<icon BUILTIN="calendar"/>
</node>
<node CREATED="1422288970174" ID="ID_1205417037" MODIFIED="1422288989343" TEXT="created_at">
<icon BUILTIN="calendar"/>
</node>
<node CREATED="1421168183279" ID="ID_1550983714" MODIFIED="1421168257894" TEXT="modified_at">
<icon BUILTIN="calendar"/>
</node>
<node CREATED="1416842286110" ID="ID_1405829185" MODIFIED="1486408118123" TEXT="properties">
<node CREATED="1486466485991" ID="ID_338191700" MODIFIED="1486466558724" TEXT="BME280">
<cloud COLOR="#0033ff"/>
<node CREATED="1486407168155" ID="ID_1788686531" MODIFIED="1486466537819" TEXT="temperature_air_outside">
<font NAME="SansSerif" SIZE="12"/>
</node>
<node CREATED="1486407826936" ID="ID_1055596152" MODIFIED="1486466540095" TEXT="humidity_air_outside">
<font NAME="SansSerif" SIZE="12"/>
</node>
<node CREATED="1486407817592" ID="ID_411745326" MODIFIED="1486466543755" TEXT="pressure_air_outside">
<font NAME="SansSerif" SIZE="12"/>
</node>
</node>
<node CREATED="1486466569984" ID="ID_1844821857" MODIFIED="1486466586137" TEXT="TSL2561">
<cloud COLOR="#ffff00"/>
<node CREATED="1486408120025" ID="ID_1351635124" MODIFIED="1486466577349" TEXT="lux_outside"/>
</node>
<node CREATED="1486466598639" ID="ID_764633750" MODIFIED="1486466632339" TEXT="DS18B20">
<cloud COLOR="#999999"/>
<node CREATED="1486464756380" ID="ID_1116050953" MODIFIED="1486464770834" TEXT="temperature_wall_outside"/>
</node>
<node CREATED="1486466633328" ID="ID_1827570185" MODIFIED="1486466666043" STYLE="fork" TEXT="DS18B20">
<edge COLOR="#00ff00" STYLE="bezier" WIDTH="thin"/>
<cloud COLOR="#999999"/>
<node CREATED="1486407168155" ID="ID_5994473" MODIFIED="1486466719244" TEXT="temperature_wall"/>
</node>
<node CREATED="1486466691744" ID="ID_260412477" MODIFIED="1486466770280" TEXT="DHT22">
<cloud COLOR="#00cc33"/>
<node CREATED="1486407283327" ID="ID_1599552867" MODIFIED="1486466737612" STYLE="fork" TEXT="temperature_wall_inside">
<edge COLOR="#00ff00" STYLE="bezier" WIDTH="thin"/>
</node>
<node CREATED="1486464725398" ID="ID_1262053581" MODIFIED="1486464738786" TEXT="humidity_wall_inside"/>
</node>
<node CREATED="1486466774527" ID="ID_863460526" MODIFIED="1486466835495" TEXT="DHT22">
<cloud COLOR="#00cc33"/>
<node CREATED="1486407291464" ID="ID_786849596" MODIFIED="1486466789675" TEXT="temperature_air_inside"/>
<node CREATED="1486407315535" ID="ID_1315834716" MODIFIED="1486466795693" TEXT="humidity_air_inside"/>
</node>
<node CREATED="1486466847495" ID="ID_381889632" MODIFIED="1486466850020" TEXT="???">
<node CREATED="1486464927902" ID="ID_500060512" MODIFIED="1486464962953" TEXT="temperatur_oven"/>
</node>
</node>
</node>
</node>
</map>
