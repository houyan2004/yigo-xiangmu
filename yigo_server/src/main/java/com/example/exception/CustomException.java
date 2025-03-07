package com.example.exception;

import lombok.Data;

/**
 * @author 12209
 * @date 2024/12/13 8:28
 * @className CustomEXCEPTION
 */

public class CustomException extends RuntimeException{
   private Integer code;
    private String msg;
  public CustomException(Integer code, String msg) {
        super(msg);

        this.msg = msg;
        this.code = code;
  }

    public Integer getCode() {
        return code;
    }

    public void setCode(Integer code) {
        this.code = code;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    @Override
    public String toString() {
        return "CustomException{" +
                "code=" + code +
                "msg='" + msg + '\'' +
                '}';
    }
}
