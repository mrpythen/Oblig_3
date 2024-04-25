package com.example.oblig3;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public class BilettRepository {

    @Autowired
    private JdbcTemplate db;

    public void lagreBilett(Kinobilett innBilett){
        String sql = "INSERT INTO Kinobilett(film, antall, fornavn, etternavn, telefonnr, epost) VALUES (?,?,?,?,?,?)";
        db.update(sql,innBilett.getFilm(),innBilett.getAntall(),innBilett.getFornavn(),innBilett.getEtternavn(),
            innBilett.getTelefonnr(),innBilett.getEpost());
    }
    public List<Kinobilett> hentAlleBiletter(){
        String sql = "SELECT * FROM Kinobilett ORDER BY etternavn";
        List<Kinobilett> alleKunder = db.query(sql,new BeanPropertyRowMapper<>(Kinobilett.class));
        return alleKunder;
    }
    public void slettAlleBiletter(){
        String sql = "DELETE FROM Kinobilett";
        db.update(sql);
    }

    public Kinobilett hentEn(int id) {

        String sql = "SELECT * FROM Kinobilett WHERE id=?";
        Kinobilett kinobilett = db.queryForObject(sql, BeanPropertyRowMapper.newInstance(Kinobilett.class), id);
        return kinobilett;
    }

    public void endreEn(Kinobilett kinobilett){
        String sql = "UPDATE Kinobilett SET film=?, antall=?, fornavn=?,etternavn=?, telefonnr=?, epost=? where id=?";
        db.update(sql, kinobilett.getFilm(), kinobilett.getAntall(), kinobilett.getFornavn(), kinobilett.getEtternavn(),
                kinobilett.getTelefonnr(), kinobilett.getEpost(), kinobilett.getId());
    }

    public void slettEn(int id) {
        String sql = "DELETE FROM Kinobilett WHERE id=?";
        db.update(sql,id);
    }
}

