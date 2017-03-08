### 11111111111 >> 111****111

```java
/**
 * 加密电话号码
 * @param oriString
 * @return
 */
public static String encipherPhone(String oriString) {
    if (oriString == null) {
        return null;
    }

    String pattern = "(((13[0-9])|(15[^4,\\D])|(18[0,0-9]))\\d{8})";
    Pattern p = Pattern.compile(pattern);
    Matcher m = p.matcher(oriString);
    while (m.find()) {
        String target = m.group().replaceAll("(\\d{3})\\d{4}(\\d{4})","$1****$2");
        oriString = oriString.replaceAll(pattern, target);
    }

    return oriString;
}
```

### 111111111111111111 >> 1111*****1111

```java
/**
 * 加密身份证号码，非严格检测
 * @param oriString
 * @return
 */
public static String encipherIdCard(String oriString) {
    if (oriString == null) {
        return null;
    }

    String pattern = "(\\d{18,18}|\\d{17,17}(X|x)|\\d{15,15})";
    Pattern p = Pattern.compile(pattern);
    Matcher m = p.matcher(oriString);
    while (m.find()) {
        if (m.group().length() == 15) {
            String target = m.group().replaceAll("(\\d{4})\\d{7}(\\d{4})","$1****$2");
            oriString = oriString.replaceAll(pattern, target);
        } else {
            String target = m.group().replaceAll("(\\d{4})\\d{10}(\\d{4})","$1****$2");
            oriString = oriString.replaceAll(pattern, target);
        }
    }

    return oriString;
}
```
