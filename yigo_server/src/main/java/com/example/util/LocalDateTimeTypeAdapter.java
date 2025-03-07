package com.example.util;/**
 * @author 繁星北斗
 * @CreateDate 2024/12/17
 * @ProjectDetails [<a>]
 */

import com.google.gson.TypeAdapter;
import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonWriter;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

/**
 * 使用自定义序列化器和反序列化器： 可以为 LocalDateTime 类编写自定义的序列化器和反序列化器，而不是直接使用反射。Gson 提供了 TypeAdapter 来实现这一点.
 */
public class LocalDateTimeTypeAdapter extends TypeAdapter<LocalDateTime> {

    private final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss");

    @Override
    public void write(JsonWriter out, LocalDateTime value) throws IOException {
        if (value == null) {
            out.nullValue();
        } else {
            out.value(formatter.format(value));
        }
    }

    @Override
    public LocalDateTime read(JsonReader in) throws IOException {
        String value = in.nextString();
        return LocalDateTime.parse(value, formatter);
    }
}
