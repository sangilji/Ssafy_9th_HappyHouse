package com.ssafy.myhouse.mapper;

import com.ssafy.myhouse.vo.SidoGugunCodeDto;
import org.apache.ibatis.annotations.Mapper;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

@Mapper
public interface MapMapper {
    List<SidoGugunCodeDto> getSido() throws SQLException;

    List<SidoGugunCodeDto> getGugun(String sidoCode) throws SQLException;
    List<SidoGugunCodeDto> getDong(Map<String,String> map) throws SQLException;
}
