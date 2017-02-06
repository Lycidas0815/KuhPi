<map version="1.0.1">
<!-- To view this file, download free mind mapping software FreeMind from http://freemind.sourceforge.net -->
<node CREATED="1283093380553" ID="ID_1723255651" MODIFIED="1435677116721" TEXT="DATDB">
<hook NAME="AutomaticEdgeColor"/>
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
<attribute NAME="version" VALUE="&quot;1.1.0&quot;"/>
<node CREATED="1422977367955" FOLDED="true" HGAP="30" ID="ID_1556166358" MODIFIED="1486408285870" POSITION="left" TEXT="admin" VSHIFT="30">
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
<node CREATED="1415639939193" FOLDED="true" HGAP="40" ID="ID_1820889152" MODIFIED="1486408284017" POSITION="right" TEXT="analysis_results">
<edge COLOR="#00ffff"/>
<cloud COLOR="#f0f0f0"/>
<node CREATED="1422381304022" ID="ID_1377265528" MODIFIED="1444744870693" TEXT="_id">
<richcontent TYPE="NOTE"><html>
  <head>
    
  </head>
  <body>
    <p>
      id_data_package.group.analysis.name.variant
    </p>
  </body>
</html></richcontent>
</node>
<node CREATED="1415641069270" ID="ID_1564132695" MODIFIED="1444645439687" TEXT="group"/>
<node CREATED="1444645425588" ID="ID_255831886" MODIFIED="1444645431334" TEXT="analysis"/>
<node CREATED="1415639990706" ID="ID_763947868" MODIFIED="1444645436990" TEXT="name"/>
<node CREATED="1444645444172" ID="ID_323979904" MODIFIED="1444645445520" TEXT="variant"/>
<node CREATED="1421955034720" ID="ID_1378060109" MODIFIED="1422710104744" TEXT="description" VSHIFT="10"/>
<node CREATED="1422645218362" ID="ID_69732411" MODIFIED="1422645221093" TEXT="analysis">
<node CREATED="1422710072623" ID="ID_1064838577" MODIFIED="1422710076245" TEXT="name"/>
<node CREATED="1422710077429" ID="ID_103781259" MODIFIED="1422710079104" TEXT="version"/>
<node CREATED="1422710079924" ID="ID_251133501" MODIFIED="1422710083416" TEXT="parameter_set"/>
</node>
<node CREATED="1415640303536" ID="ID_213964822" MODIFIED="1421503475518" TEXT="id_worker">
<icon BUILTIN="password"/>
</node>
<node CREATED="1416598349670" ID="ID_1414553073" MODIFIED="1421503480422" TEXT="id_data_package" VSHIFT="10">
<icon BUILTIN="password"/>
</node>
<node CREATED="1422289014530" ID="ID_1675903050" MODIFIED="1422289067280" TEXT="created_at" VSHIFT="10">
<icon BUILTIN="calendar"/>
</node>
<node CREATED="1415640318985" ID="ID_975643642" MODIFIED="1422289065631" TEXT="modified_at" VSHIFT="10">
<icon BUILTIN="calendar"/>
</node>
<node CREATED="1415640005714" ID="ID_383085188" MODIFIED="1415640129502" TEXT="results[]" VSHIFT="10">
<node CREATED="1415640118145" ID="ID_479490775" MODIFIED="1415702203154" TEXT="key"/>
<node CREATED="1419080018228" ID="ID_1048179841" MODIFIED="1419080020736" TEXT="properties">
<node CREATED="1415640120017" ID="ID_782219661" MODIFIED="1415640126173" TEXT="value"/>
<node CREATED="1415702776888" ID="ID_348914861" MODIFIED="1415702779403" TEXT="unit"/>
<node CREATED="1421954995476" ID="ID_1320856211" MODIFIED="1421955023145" TEXT="description"/>
</node>
</node>
</node>
<node CREATED="1415639866554" ID="ID_603295218" MODIFIED="1422381347082" POSITION="left" TEXT="data_packages" VSHIFT="-50">
<richcontent TYPE="NOTE"><html>
  <head>
    
  </head>
  <body>
    <p>
      tempor&#xe4;re DataPackages werden in Collection data_packages.tmp abgelegt.
    </p>
    <p>
      Dies wird z.B. als Zwischenergebnis beim Datenmerge verwendet.
    </p>
  </body>
</html></richcontent>
<edge COLOR="#00ff00"/>
<cloud COLOR="#f0f0f0"/>
<node CREATED="1422381338418" ID="ID_1460425486" MODIFIED="1486408456781" TEXT="_id">
<richcontent TYPE="NOTE"><html>
  <head>
    
  </head>
  <body>
    <p>
      timestamp
    </p>
  </body>
</html>
</richcontent>
<icon BUILTIN="help"/>
</node>
<node CREATED="1415697214688" ID="ID_1311176257" MODIFIED="1422381347080" TEXT="name" VSHIFT="10"/>
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
<node CREATED="1486407168155" ID="ID_1788686531" MODIFIED="1486408272569" TEXT="temperature_air_outside">
<richcontent TYPE="NOTE"><html>
  <head>
    
  </head>
  <body>
    <p>
      BME280
    </p>
  </body>
</html>
</richcontent>
<cloud COLOR="#3333ff"/>
<font NAME="SansSerif" SIZE="12"/>
</node>
<node CREATED="1486407817592" ID="ID_411745326" MODIFIED="1486408274726" TEXT="pressure_air_outside">
<richcontent TYPE="NOTE"><html>
  <head>
    
  </head>
  <body>
    <p>
      BME280
    </p>
  </body>
</html>
</richcontent>
<cloud COLOR="#3333ff"/>
<font NAME="SansSerif" SIZE="12"/>
</node>
<node CREATED="1486407826936" ID="ID_1055596152" MODIFIED="1486408275907" TEXT="humidity_air_outside">
<richcontent TYPE="NOTE"><html>
  <head>
    
  </head>
  <body>
    <p>
      BME280
    </p>
  </body>
</html>
</richcontent>
<cloud COLOR="#3333ff"/>
<font NAME="SansSerif" SIZE="12"/>
</node>
<node CREATED="1486408120025" ID="ID_1351635124" MODIFIED="1486408238253" TEXT="lux_outside">
<richcontent TYPE="NOTE"><html>
  <head>
    
  </head>
  <body>
    <p>
      TSL2561
    </p>
  </body>
</html>
</richcontent>
<cloud COLOR="#00cc00"/>
</node>
<node CREATED="1486407168155" ID="ID_5994473" MODIFIED="1486408253698" TEXT="temperature_wall">
<richcontent TYPE="NOTE"><html>
  <head>
    
  </head>
  <body>
    <p>
      DS1820b Edelstahl
    </p>
  </body>
</html>
</richcontent>
<cloud COLOR="#999999"/>
</node>
<node CREATED="1486407283327" ID="ID_1599552867" MODIFIED="1486408256209" TEXT="temperature_wall_inside">
<richcontent TYPE="NOTE"><html>
  <head>
    
  </head>
  <body>
    <p>
      DS1820b
    </p>
  </body>
</html>
</richcontent>
<cloud COLOR="#999999"/>
</node>
<node CREATED="1486407315535" ID="ID_1315834716" MODIFIED="1486408263374" TEXT="humidity_air_inside">
<richcontent TYPE="NOTE"><html>
  <head>
    
  </head>
  <body>
    <p>
      DHT22
    </p>
  </body>
</html>
</richcontent>
<cloud COLOR="#ffff00"/>
</node>
<node CREATED="1486407291464" ID="ID_786849596" MODIFIED="1486408264528" TEXT="temperature_air_inside">
<richcontent TYPE="NOTE"><html>
  <head>
    
  </head>
  <body>
    <p>
      DHT22
    </p>
  </body>
</html>
</richcontent>
<cloud COLOR="#ffff00"/>
</node>
</node>
</node>
<node CREATED="1415697275423" HGAP="40" ID="ID_1855564290" MODIFIED="1420741820115" POSITION="right" TEXT="file_repository" VSHIFT="-30">
<edge COLOR="#ff00ff"/>
<cloud COLOR="#f0f0f0"/>
</node>
</node>
</map>
